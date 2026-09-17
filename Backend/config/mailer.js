let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (err) {
  nodemailer = null;
}

/**
 * Creates Nodemailer Transporter with robust Gmail and SMTP support
 */
const createTransporter = () => {
  if (!nodemailer) {
    console.warn('[Mailer Warning] nodemailer module is not available.');
    return null;
  }

  const user = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
  const rawPass = process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.trim() : '';
  // Strip any spaces from Gmail App Passwords (e.g. "vryn whcc jdnf krgl" -> "vrynwhccjdnfkrgl")
  const pass = rawPass.replace(/\s+/g, '');

  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
  const secure = process.env.EMAIL_SECURE === 'true' || port === 465;

  if (!user || !pass) {
    console.warn('[Mailer Warning] EMAIL_USER or EMAIL_PASSWORD is missing in .env');
    return null;
  }

  // Optimize transport for Gmail
  if (host.includes('gmail') || user.endsWith('@gmail.com')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: user,
      pass: pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

/**
 * Sends OTP Email to student
 * 
 * @param {String} email - Recipient email
 * @param {String} otpCode - 6-digit OTP code
 * @returns {Promise<Boolean>}
 */
const sendOtpEmail = async (email, otpCode) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('==================================================');
    console.log(`[DEV MAILER FALLBACK] Verification OTP for ${email}: [ ${otpCode} ]`);
    console.log('==================================================');
    return true;
  }

  const mailOptions = {
    from: `"StudAssist - Student Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'StudAssist - Your Verification OTP Code',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #1e3a8a; margin: 0; font-size: 22px;">StudAssist</h2>
          <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Anna University AI Student Support Assistant</p>
        </div>
        
        <p style="color: #334155; font-size: 14px; line-height: 1.5;">Hello,</p>
        <p style="color: #334155; font-size: 14px; line-height: 1.5;">Your verification OTP code for StudAssist is:</p>
        
        <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 20px; text-align: center; border-radius: 12px; margin: 24px 0; border: 1px solid #bfdbfe;">
          <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1d4ed8; font-family: monospace;">${otpCode}</span>
        </div>
        
        <p style="color: #475569; font-size: 13px; line-height: 1.5;">This code is valid for <strong>5 minutes</strong>. Do not share this OTP with anyone.</p>
        
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">If you did not request this email, please ignore it.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Mailer Success] OTP email delivered to ${email} (MessageID: ${info.messageId})`);
    return true;
  } catch (error) {
    console.error(`[Mailer Error] Failed to send email to ${email}:`, error.message);
    console.log('==================================================');
    console.log(`[DEV MAILER FALLBACK] Verification OTP for ${email}: [ ${otpCode} ]`);
    console.log('==================================================');
    return false;
  }
};

module.exports = {
  sendOtpEmail
};
