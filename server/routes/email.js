
const express = require('express');
const { Resend } = require('resend');
const router = express.Router();

const { emailLimiter } = require('../middleware/rateLimiter');

const FRONTEND_URL = 'https://dev-aura-virid.vercel.app';

const escapeHtml = (value = '') => {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Create Resend client using the API key configured on the server.
const createResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing.');
  }

  return new Resend(process.env.RESEND_API_KEY);
};

// Sender must be verified in Resend for production use.
// onboarding@resend.dev is intended for Resend testing.
const getSenderEmail = () => {
  return (
    process.env.RESEND_FROM_EMAIL ||
    'DevAura <onboarding@resend.dev>'
  );
};

// Send room invitation.
router.post('/share-room', emailLimiter, async (req, res) => {
  try {
    const {
      recipientEmail,
      recipientName,
      senderName,
      roomId,
      message,
    } = req.body || {};

    if (
      typeof recipientEmail !== 'string' ||
      !recipientEmail.trim() ||
      typeof roomId !== 'string' ||
      !roomId.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Recipient email and room ID are required.',
      });
    }

    const email = recipientEmail.trim();
    const cleanRoomId = roomId.trim();

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    if (email.length > 254 || cleanRoomId.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'The email address or room ID is too long.',
      });
    }

    const cleanRecipientName =
      typeof recipientName === 'string'
        ? recipientName.trim().slice(0, 100)
        : '';

    const cleanSenderName =
      typeof senderName === 'string' && senderName.trim()
        ? senderName.trim().slice(0, 100)
        : 'Someone';

    const cleanMessage =
      typeof message === 'string'
        ? message.trim().slice(0, 1000)
        : '';

    const safeRecipientName = escapeHtml(
      cleanRecipientName || 'there'
    );

    const safeSenderName = escapeHtml(cleanSenderName);
    const safeRoomId = escapeHtml(cleanRoomId);
    const safeMessage = escapeHtml(cleanMessage);

    const subject =
      `${cleanSenderName} invited you to collaborate on DevAura`;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevAura Invitation</title>
      </head>

      <body style="margin:0;padding:20px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">

          <div style="padding:30px 20px;text-align:center;background:linear-gradient(135deg,#667eea,#764ba2);color:#ffffff;">
            <h1 style="margin:0 0 10px;">DevAura 🚀</h1>
            <p style="margin:0;">Collaborate. Code. Create.</p>
          </div>

          <div style="padding:30px;">
            <h2>Hi ${safeRecipientName}! 👋</h2>

            <p>
              <strong>${safeSenderName}</strong> has invited you
              to collaborate on a coding session using DevAura.
            </p>

            ${
              cleanMessage
                ? `
                  <div style="padding:15px;background:#f8fafc;border-left:4px solid #818cf8;margin:20px 0;">
                    <p style="margin:0 0 6px;">
                      <strong>Personal message:</strong>
                    </p>
                    <p style="margin:0;white-space:pre-wrap;">${safeMessage}</p>
                  </div>
                `
                : ''
            }

            <div style="padding:20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin:24px 0;">
              <h3 style="margin-top:0;">Your Room ID</h3>

              <p style="padding:12px;background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;font-family:monospace;word-break:break-all;">
                ${safeRoomId}
              </p>

              <div style="text-align:center;margin-top:24px;">
                <a
                  href="${FRONTEND_URL}"
                  style="display:inline-block;padding:13px 24px;background:#6366f1;color:#ffffff;text-decoration:none;border-radius:7px;font-weight:bold;"
                >
                  Open DevAura
                </a>
              </div>
            </div>

            <h3>How to join</h3>
            <ol>
              <li>Open DevAura using the button above.</li>
              <li>Join the collaboration room using the Room ID provided.</li>
              <li>Start coding and collaborating in real time!</li>
            </ol>

            <p style="color:#64748b;font-size:13px;">
              Collaborate on code, chat with teammates, use the shared
              whiteboard, and run code together.
            </p>
          </div>

          <div style="padding:20px;text-align:center;background:#1e293b;color:#cbd5e1;font-size:13px;">
            <p>You're receiving this email because someone invited you to DevAura.</p>
            <p>
              <a href="${FRONTEND_URL}" style="color:#c4b5fd;">
                Open DevAura
              </a>
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    const textContent = `
DevAura Collaboration Invitation

Hi ${cleanRecipientName || 'there'}!

${cleanSenderName} has invited you to collaborate on DevAura.

${cleanMessage ? `Personal message: ${cleanMessage}\n` : ''}

Room ID: ${cleanRoomId}

Open DevAura:
${FRONTEND_URL}

How to join:
1. Open DevAura using the link above.
2. Join the room using the Room ID.
3. Start collaborating!

DevAura - AI-Powered Collaborative Coding Platform
    `.trim();

    const resend = createResendClient();

    const { data, error } = await resend.emails.send({
      from: getSenderEmail(),
      to: [email],
      subject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      // Log the provider response, but never log API credentials.
      console.error('[EMAIL] Resend send failed:', {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });

      return res.status(502).json({
        success: false,
        message: 'Email provider rejected the invitation. Check server logs.',
      });
    }

    console.log('[EMAIL] Invitation accepted by Resend:', {
      emailId: data?.id,
      recipient: email,
    });

    return res.status(200).json({
      success: true,
      message: 'Invitation email submitted successfully!',
      messageId: data?.id,
    });
  } catch (error) {
    console.error('[EMAIL] Failed to send invitation:', {
      message: error.message,
      name: error.name,
      statusCode: error.statusCode,
    });

    if (error.message === 'RESEND_API_KEY is missing.') {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured on the server.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to send invitation. Please try again later.',
    });
  }
});

// Check whether the Resend API key works.
// This endpoint does not send an email.
router.get('/test', async (req, res) => {
  try {
    const resend = createResendClient();

    const { data, error } = await resend.domains.list();

    if (error) {
      console.error('[EMAIL] Resend API verification failed:', {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });

      return res.status(502).json({
        success: false,
        message: 'Resend API verification failed. Check server logs.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Resend API connection successful.',
    });
  } catch (error) {
    console.error('[EMAIL] Resend test failed:', {
      message: error.message,
      name: error.name,
      statusCode: error.statusCode,
    });

    return res.status(500).json({
      success: false,
      message: 'Could not connect to Resend. Check server configuration.',
    });
  }
});

module.exports = router;
