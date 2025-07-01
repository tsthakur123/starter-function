const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (context) => {
  try {
    const data = JSON.parse(context.payload || '{}');
    const email = data.email;
    if (!email) throw new Error("Email not provided");

    // your resend email logic here
    context.log(`Sending welcome email to: ${email}`);

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

    return { success: true };
  } catch (error) {
    context.error(error);
    return { success: false, message: error.message };
  }
};
