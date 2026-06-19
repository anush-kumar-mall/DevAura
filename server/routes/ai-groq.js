const express = require('express');
const router = express.Router();

// Groq client (primary)
let groqClient = null;
if (process.env.GROQ_API_KEY) {
  const Groq = require('groq-sdk');
  groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
}

// Gemini client (fallback)
let genAI = null;
if (process.env.GOOGLE_AI_API_KEY && process.env.GOOGLE_AI_API_KEY.startsWith('AIza')) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
}

const isGroqAvailable = () => !!groqClient && !!process.env.GROQ_API_KEY;
const isGeminiAvailable = () => !!genAI;

// Query Groq
const queryGroq = async (prompt) => {
  const completion = await groqClient.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 2048,
  });
  return completion.choices[0]?.message?.content || '';
};

// Query Gemini
const queryGemini = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  return result.response.text();
};

// Enhanced prompt for coding
const createCodingPrompt = (userPrompt, code, fileName) => {
  let prompt = `You are an intelligent coding assistant. Respond naturally like a helpful coding buddy.

User's question: ${userPrompt}`;

  if (code && fileName) {
    const fileExtension = fileName.split('.').pop();
    prompt += `

Current file: ${fileName}
Current code:
${code}`;
  }

  prompt += `

RESPONSE GUIDELINES:
- Write in plain text, conversational tone
- NO markdown formatting (no triple backticks, no bold/italic)
- When showing code, present it as clean, copyable blocks with proper indentation
- NEVER use line numbers - just show the actual code
- Keep responses focused and under 400 words`;

  return prompt;
};

// Post-process response
const improveResponse = (text) => {
  return text
    .replace(/```[\w]*\n?/g, '\n')
    .replace(/```/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\*\s+/gm, '• ')
    .replace(/^-\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/I hope this helps!?/gi, '')
    .replace(/Let me know if you have any.*?questions.*/gi, '')
    .replace(/Feel free to ask.*?/gi, '')
    .trim();
};

const detectRequestType = (prompt) => {
  if (/complete|finish|what comes next|continue/i.test(prompt)) return 'autocomplete';
  if (/error|bug|wrong|broken|not working|issue|debug/i.test(prompt)) return 'error-check';
  if (/optimize|improve|better|refactor|clean up/i.test(prompt)) return 'optimization';
  if (/add|insert|include|implement|create|fix|update|modify|change/i.test(prompt)) return 'modification';
  return 'general';
};

// Main chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { prompt, code, fileName, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    if (!isGroqAvailable() && !isGeminiAvailable()) {
      return res.status(503).json({
        success: false,
        message: 'No AI service configured. Add GROQ_API_KEY to your .env file.',
        setup: {
          step1: 'Go to https://groq.com and sign up (free)',
          step2: 'Create an API key',
          step3: 'Add GROQ_API_KEY=gsk_... to your .env file',
          step4: 'Restart the server'
        }
      });
    }

    const enhancedPrompt = createCodingPrompt(prompt, code, fileName);
    let rawResponse = '';
    let aiService = '';

    if (isGroqAvailable()) {
      rawResponse = await queryGroq(enhancedPrompt);
      aiService = 'groq';
    } else {
      rawResponse = await queryGemini(enhancedPrompt);
      aiService = 'gemini';
    }

    const improvedResponse = improveResponse(rawResponse);

    res.json({
      success: true,
      response: improvedResponse,
      aiService,
      message: `Powered by ${aiService === 'groq' ? 'Groq (Llama 3.3)' : 'Google Gemini'}`,
      metadata: {
        hasCode: !!code,
        fileName: fileName || null,
        responseLength: improvedResponse.length,
        requestType: detectRequestType(prompt)
      }
    });

  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({
      success: false,
      message: 'AI service error',
      error: error.message
    });
  }
});

// Autocomplete endpoint
router.post('/autocomplete', async (req, res) => {
  try {
    const { code, fileName, cursorPosition } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Code is required' });
    }

    if (!isGroqAvailable() && !isGeminiAvailable()) {
      return res.status(503).json({ success: false, message: 'AI not available', suggestions: [] });
    }

    const lines = code.split('\n');
    const currentLine = cursorPosition ? lines[cursorPosition.line] || '' : lines[lines.length - 1];

    const autocompletePrompt = `You are a code autocomplete assistant. Suggest what comes next.

File: ${fileName || 'untitled'}
Code:
${code}

Current line: "${currentLine}"

Provide 1-3 intelligent next lines. Just the code, no explanations, properly indented.`;

    let rawResponse = '';
    if (isGroqAvailable()) {
      rawResponse = await queryGroq(autocompletePrompt);
    } else {
      rawResponse = await queryGemini(autocompletePrompt);
    }

    const suggestions = rawResponse.trim().split('\n').slice(0, 3);

    res.json({ success: true, suggestions, aiService: 'autocomplete' });

  } catch (error) {
    console.error('Autocomplete error:', error);
    res.status(500).json({ success: false, message: 'Autocomplete error', suggestions: [] });
  }
});

// Status endpoint
router.get('/status', async (req, res) => {
  const groqAvailable = isGroqAvailable();
  const geminiAvailable = isGeminiAvailable();
  const anyAvailable = groqAvailable || geminiAvailable;

  res.json({
    success: true,
    currentService: groqAvailable ? 'groq' : geminiAvailable ? 'gemini' : 'unavailable',
    services: { groq: groqAvailable, gemini: geminiAvailable },
    model: groqAvailable ? 'Llama 3.3 70B (Groq)' : geminiAvailable ? 'Gemini 1.5 Flash' : 'None',
    message: anyAvailable ? 'AI is ready' : 'No AI configured — add GROQ_API_KEY to .env'
  });
});

console.log('Groq available:', isGroqAvailable());
console.log('Gemini available:', isGeminiAvailable());

module.exports = router;