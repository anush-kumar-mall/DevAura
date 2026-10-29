
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const { emailLimiter } = require('../middleware/rateLimiter');

const FRONTEND_URL = 'https://dev-aura-virid.vercel.app';

// Gmail SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
};

// Escape user-provided values before inserting them into HTML.
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

// Validate email address
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Share room invitation
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

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('[EMAIL] EMAIL_USER or EMAIL_PASS is missing.');

      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact the administrator.',
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

    // The deployed room ID is included so the recipient can join manually.
    const roomUrl = FRONTEND_URL;

    const safeRecipientName = escapeHtml(cleanRecipientName || 'there');
    const safeSenderName = escapeHtml(cleanSenderName);
    const safeRoomId = escapeHtml(cleanRoomId);
    const safeMessage = escapeHtml(cleanMessage);

    const subject = `${cleanSenderName} invited you to collaborate on DevAura`;

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
                ? `<div style="padding:15px;background:#f8fafc;border-left:4px solid #818cf8;margin:20px 0;">
                    <p style="margin:0 0 6px;"><strong>Personal message:</strong></p>
                    <p style="margin:0;white-space:pre-wrap;">${safeMessage}</p>
                  </div>`
                : ''
            }

            <div style="padding:20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin:24px 0;">
              <h3 style="margin-top:0;">Your Room ID</h3>
              <p style="padding:12px;background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;font-family:monospace;word-break:break-all;">
                ${safeRoomId}
              </p>

              <div style="text-align:center;margin-top:24px;">
                <a
                  href="${roomUrl}"
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
              You can use DevAura to edit code together, chat with collaborators,
              draw on the shared whiteboard, and run code.
            </p>
          </div>

          <div style="padding:20px;text-align:center;background:#1e293b;color:#cbd5e1;font-size:13px;">
            <p>You're receiving this email because someone invited you to DevAura.</p>
            <p>
              <a href="${roomUrl}" style="color:#c4b5fd;">${roomUrl}</a>
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
${roomUrl}

How to join:
1. Open DevAura using the link above.
2. Join the room using the Room ID.
3. Start collaborating!

DevAura - AI-Powered Collaborative Coding Platform
    `.trim();

    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'DevAura',
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject,
      text: textContent,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('[EMAIL] Invitation sent successfully:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    if (!info.accepted || info.accepted.length === 0) {
      console.error('[EMAIL] SMTP did not accept the recipient.');

      return res.status(502).json({
        success: false,
        message: 'The email server did not accept the recipient address.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Invitation email sent successfully!',
      messageId: info.messageId,
    });
  } catch (error) {
    // Log diagnostic information without exposing credentials.
    console.error('[EMAIL] Failed to send invitation:', {
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
    });

    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Check the Gmail App Password in Render.',
      });
    }

    if (
      error.code === 'ENOTFOUND' ||
      error.code === 'ECONNECTION' ||
      error.code === 'ETIMEDOUT' ||
      error.code === 'ESOCKET'
    ) {
      return res.status(502).json({
        success: false,
        message: 'Could not connect to the email server. Please try again later.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
    });
  }
});

// Check email configuration and SMTP connectivity.
// This endpoint does not send an email.
router.get('/test', async (req, res) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: 'EMAIL_USER or EMAIL_PASS is missing in the server environment.',
      });
    }

    const transporter = createTransporter();

    await transporter.verify();

    console.log('[EMAIL] SMTP connection verified successfully.');

    return res.status(200).json({
      success: true,
      message: 'SMTP connection verified successfully.',
    });
  } catch (error) {
    console.error('[EMAIL] SMTP verification failed:', {
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
    });

    return res.status(500).json({
      success: false,
      message: 'SMTP verification failed. Check the Render email configuration and logs.',
    });
  }
});

module.exports = router;
