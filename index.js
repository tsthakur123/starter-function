const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async ({ req, res }) => {
  try {
    const { email } = JSON.parse(req.body);

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "🔥 Welcome to GRXXVE",
      html: `
        <h1>You're in!</h1>
        <p>Thanks for joining the GRXXVE drop list. We'll hit you up first when it goes live!</p>
        <p>Stay groovy 👟🔥</p>
      `,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};
