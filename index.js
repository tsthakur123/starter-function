const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async ({ req, res, log }) => {
  try {
    const body = JSON.parse(req.body); // ✅ this works inside Appwrite Function
    const email = body.email;

    if (!email) throw new Error("Email not provided");

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
    log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
