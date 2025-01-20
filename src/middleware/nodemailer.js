import nodemailer from "nodemailer";


const user = "prateek.jn624@gmail.com";
const pass = "upbofodmdvnunsjo";

const transporter = nodemailer.createTransport({
  // Configure your email service provider
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
export const sendEmail = async (email, name) => {
    try {
      const mailOptions = {
        from: user,
        to: email,
        subject: "Application Confirmation",
        html: `<p>Dear ${name},</p>
               <p>Thank you for applying for the job. Your application has been received successfully.</p>
               <p>Regards,</p>
               <p>Your Company</p>`,
      };
  
      // Send the email using the transporter
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
};

export default transporter;