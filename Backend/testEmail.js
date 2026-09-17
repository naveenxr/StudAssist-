require('dotenv').config();
const nodemailer = require('nodemailer');

async function testSend() {
  const user = process.env.EMAIL_USER;
  const rawPass = process.env.EMAIL_PASSWORD || '';
  const cleanPass = rawPass.replace(/\s+/g, '');

  console.log(`Testing email sending from: ${user}`);
  console.log(`Password length (raw): ${rawPass.length}, (cleaned): ${cleanPass.length}`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: cleanPass
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"StudAssist Support" <${user}>`,
      to: user,
      subject: 'StudAssist - Test Email Verification',
      text: 'This is a test email from StudAssist. Your OTP system is working correctly!'
    });
    console.log('SUCCESS! Email sent successfully:', info.messageId);
  } catch (err) {
    console.error('ERROR sending email:', err);
  }
}

testSend();
