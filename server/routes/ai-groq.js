const express = require('express');
const router = express.Router();

// ==========================================
// 1. AI PROVIDER INITIALIZATION
// ==========================================

// Groq - Primary provider
let groqClient = null;

if (process.env.GROQ_API_KEY) {
  const Groq = require('groq-sdk');
  groqClient = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

// Gemini - Fallback provider
let genAI = null;

if (
  process.env.GOOGLE_AI_API_KEY &&
  process.env.GOOGLE_AI_API_KEY.startsWith('AIza')
) {
  const { GoogleGenerativeAI } = require('@google/generative-ai');

  genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
}

const isGroqAvailable = () =>
  !!groqClient && !!process.env.GROQ_API_KEY;

const isGeminiAvailable = () => !!genAI;

const isAIAvailable = () =>
  isGroqAvailable() || isGeminiAvailable();


// ==========================================
// 2. CONFIGURATION
// ==========================================

const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 6000;
const MAX_CODE_LENGTH = 15000;
const MAX_CONTEXT_LENGTH = 4000;

const SYSTEM_PROMPT = `
You are DevAura AI, an intelligent coding assistant inside a
real-time collaborative code editor.

Your responsibilities:

1. Help users understand, write, debug, and improve code.
2. Explain programming concepts in a clear and beginner-friendly way.
3. Remember relevant information from the conversation history
   provided to you.
4. Use previous messages when answering follow-up questions.
5. When the user refers to previous code or explanations,
   use the available conversation context.
6. If the user changes a requirement, follow the latest requirement.
7. Never pretend to remember information that is not present
   in the provided context.
8. If information is missing, ask the user for clarification.

Coding guidelines:

- Give accurate and practical solutions.
- Explain important changes when modifying code.
- Preserve the user's existing architecture whenever possible.
- Do not unnecessarily rewrite unrelated parts of the code.
- Use proper formatting and indentation.
- Include code examples when useful.
- Avoid inventing APIs, libraries, or project details.

Respond naturally and stay focused on the user's question.
`;


// ==========================================
// 3. HELPER FUNCTIONS
// ==========================================

const safeStringify = (value) => {
  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return '';
  }
};


// Normalize and limit conversation history
const normalizeHistory = (history) => {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((message) => {
      return (
        message &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0
      );
    })
    .map((message) => {
      let role = message.role;

      // Support both role-based and old frontend message types
      if (!role) {
        if (message.type === 'question') {
          role = 'user';
        } else if (
          ['answer', 'conversion'].includes(message.type)
        ) {
          role = 'assistant';
        }
      }

      if (!['user', 'assistant'].includes(role)) {
        return null;
      }

      return {
        role,
        content: message.content
          .trim()
          .slice(0, MAX_MESSAGE_LENGTH),
      };
    })
    .filter(Boolean)
    .slice(-MAX_HISTORY_MESSAGES);
};


// Prepare current user prompt with code and context
const createCodingPrompt = ({
  prompt,
  code,
  fileName,
  context,
}) => {
  let enhancedPrompt = `User's question:

${prompt}`;

  if (fileName || code) {
    enhancedPrompt += `

Current file: ${fileName || 'Untitled'}

Current code:
${(code || 'No code provided').slice(0, MAX_CODE_LENGTH)}`;
  }

  if (context) {
    const contextText = safeStringify(context);

    if (contextText) {
      enhancedPrompt += `

Additional project context:
${contextText.slice(0, MAX_CONTEXT_LENGTH)}`;
    }
  }

  return enhancedPrompt;
};


// Convert conversation history into Groq message format
const buildGroqMessages = (history, currentPrompt) => {
  return [
    {
      role: 'system',
      content: SYSTEM_PROMPT,
    },

    ...history,

    {
      role: 'user',
      content: currentPrompt,
    },
  ];
};


// Gemini requires user/model roles instead of user/assistant.
// It also works best when the conversation starts with a user message.
const buildGeminiContents = (messages) => {
  const conversationMessages = messages.filter(
    (message) => message.role !== 'system'
  );

  const contents = [];

  for (const message of conversationMessages) {
    const role = message.role === 'assistant' ? 'model' : 'user';

    const previousMessage = contents[contents.length - 1];

    // Merge consecutive messages with the same role
    if (previousMessage && previousMessage.role === role) {
      previousMessage.parts[0].text += `\n\n${message.content}`;
    } else {
      contents.push({
        role,
        parts: [{ text: message.content }],
      });
    }
  }

  // Gemini conversation should start with a user message
  while (contents.length > 0 && contents[0].role !== 'user') {
    contents.shift();
  }

  return contents;
};


// ==========================================
// 4. GROQ REQUEST
// ==========================================

const queryGroq = async (messages) => {
  const completion = await groqClient.chat.completions.create({
    messages,
    model: 'openai/gpt-oss-120b',
    temperature: 0.7,
    max_tokens: 2048,
  });

  return completion.choices[0]?.message?.content || '';
};


// ==========================================
// 5. GEMINI REQUEST
// ==========================================

const queryGemini = async (messages) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: SYSTEM_PROMPT,
  });

  const contents = buildGeminiContents(messages);

  if (contents.length === 0) {
    throw new Error('No valid conversation messages for Gemini');
  }

  const result = await model.generateContent({
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  });

  return result.response.text() || '';
};


// ==========================================
// 6. PROVIDER SELECTION + AUTOMATIC FALLBACK
// ==========================================

const generateAIResponse = async (messages) => {

  // Try Groq first
  if (isGroqAvailable()) {
    try {
      const response = await queryGroq(messages);

      return {
        response,
        aiService: 'groq',
      };

    } catch (error) {
      console.error('Groq request failed:', error.message);

      // If Gemini is not configured, propagate the error
      if (!isGeminiAvailable()) {
        throw error;
      }

      console.log('Trying Gemini fallback...');
    }
  }

  // Try Gemini if Groq is unavailable or failed
  if (isGeminiAvailable()) {
    try {
      const response = await queryGemini(messages);

      return {
        response,
        aiService: 'gemini',
      };

    } catch (error) {
      console.error('Gemini request failed:', error.message);
      throw error;
    }
  }

  throw new Error('No AI provider is available');
};


// ==========================================
// 7. REQUEST TYPE DETECTION
// ==========================================

const detectRequestType = (prompt) => {
  if (/complete|finish|what comes next|continue/i.test(prompt)) {
    return 'autocomplete';
  }

  if (/error|bug|wrong|broken|not working|issue|debug/i.test(prompt)) {
    return 'error-check';
  }

  if (/optimize|improve|better|refactor|clean up/i.test(prompt)) {
    return 'optimization';
  }

  if (/add|insert|include|implement|create|fix|update|modify|change/i.test(prompt)) {
    return 'modification';
  }

  return 'general';
};


// ==========================================
// 8. MAIN CHAT ENDPOINT
// ==========================================

router.post('/chat', async (req, res) => {
  try {
    const {
      prompt,
      code,
      fileName,
      context,
      history,
    } = req.body;

    // Validate prompt
    if (
      typeof prompt !== 'string' ||
      !prompt.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'A valid prompt is required',
      });
    }

    if (!isAIAvailable()) {
      return res.status(503).json({
        success: false,
        message: 'No AI service configured. Add GROQ_API_KEY or GOOGLE_AI_API_KEY.',
      });
    }

    // Validate optional code
    const safeCode =
      typeof code === 'string'
        ? code.slice(0, MAX_CODE_LENGTH)
        : '';

    // Normalize recent conversation history
    const conversationHistory = normalizeHistory(history);

    // Build current prompt with code and project context
    const enhancedPrompt = createCodingPrompt({
      prompt: prompt.trim(),
      code: safeCode,
      fileName:
        typeof fileName === 'string'
          ? fileName.slice(0, 255)
          : '',
      context,
    });

    // Combine system instructions + history + current message
    const messages = buildGroqMessages(
      conversationHistory,
      enhancedPrompt
    );

    // Generate response with automatic fallback
    const result = await generateAIResponse(messages);

    const improvedResponse = result.response.trim();

    return res.json({
      success: true,
      response: improvedResponse,
      aiService: result.aiService,

      message:
        result.aiService === 'groq'
          ? 'Powered by Groq (Llama 3.3)'
          : 'Powered by Google Gemini',

      metadata: {
        hasCode: !!safeCode,
        fileName: fileName || null,
        responseLength: improvedResponse.length,
        requestType: detectRequestType(prompt),
        historyMessagesUsed: conversationHistory.length,
      },
    });

  } catch (error) {
    console.error('AI chat error:', error);

    return res.status(500).json({
      success: false,
      message: 'AI service error. Please try again.',
    });
  }
});


// ==========================================
// 9. AUTOCOMPLETE ENDPOINT
// ==========================================

router.post('/autocomplete', async (req, res) => {
  try {
    const {
      code,
      fileName,
      cursorPosition,
    } = req.body;

    if (typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Code is required',
        suggestions: [],
      });
    }

    if (!isAIAvailable()) {
      return res.status(503).json({
        success: false,
        message: 'AI not available',
        suggestions: [],
      });
    }

    const safeCode = code.slice(0, MAX_CODE_LENGTH);

    const lines = safeCode.split('\n');

    const currentLine =
      cursorPosition &&
      Number.isInteger(cursorPosition.line)
        ? lines[cursorPosition.line] || ''
        : lines[lines.length - 1];

    const autocompletePrompt = `
You are a code autocomplete assistant.

File: ${fileName || 'untitled'}

Existing code:
${safeCode}

Current line:
"${currentLine}"

Suggest 1-3 intelligent next lines of code.

Rules:
- Return only code.
- Do not include explanations.
- Do not use markdown code fences.
- Preserve existing indentation.
- Do not repeat code that already exists.
`;

    const messages = [
      {
        role: 'system',
        content: 'You are an accurate code autocomplete assistant.',
      },
      {
        role: 'user',
        content: autocompletePrompt,
      },
    ];

    const result = await generateAIResponse(messages);

    const suggestions = result.response
      .trim()
      .replace(/^```[\w-]*\s*/i, '')
      .replace(/\s*```$/, '')
      .split('\n')
      .filter((line) => line.trim())
      .slice(0, 3);

    return res.json({
      success: true,
      suggestions,
      aiService: result.aiService,
    });

  } catch (error) {
    console.error('Autocomplete error:', error);

    return res.status(500).json({
      success: false,
      message: 'Autocomplete error',
      suggestions: [],
    });
  }
});


// ==========================================
// 10. AI STATUS ENDPOINT
// ==========================================

router.get('/status', (req, res) => {
  const groqAvailable = isGroqAvailable();
  const geminiAvailable = isGeminiAvailable();

  const anyAvailable = groqAvailable || geminiAvailable;

  res.json({
    success: true,

    currentService: groqAvailable
      ? 'groq'
      : geminiAvailable
        ? 'gemini'
        : 'unavailable',

    services: {
      groq: groqAvailable,
      gemini: geminiAvailable,
    },

    model: groqAvailable
  ? 'GPT OSS 120B (Groq)'
  : geminiAvailable
    ? 'Gemini 1.5 Flash'
    : 'None',

    fallbackEnabled: groqAvailable && geminiAvailable,

    message: anyAvailable
      ? 'AI is ready'
      : 'No AI configured — add an AI API key to your environment',
  });
});


// ==========================================
// 11. INITIALIZATION LOGS
// ==========================================

console.log('Groq available:', isGroqAvailable());
console.log('Gemini available:', isGeminiAvailable());

module.exports = router;