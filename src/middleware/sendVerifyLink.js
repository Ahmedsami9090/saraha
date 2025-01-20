import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "zaghloul85@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});
export const sendVerifyLink = async (receiver, token) => {
  try {
    const link = `https://localhost:3000/users/verify?token=${token}`
    await transporter.sendMail({
      from: '"Saraha" <zaghloul85@gmail.com>', // sender address
      to: receiver, // list of receivers
      subject: "Confirm your email", // Subject line
      text: "", // plain text body
      html: `<p>thank you for registering in Saraha. please <a href=${link}>confirm</a> your email to use our service.</p>`, // html body
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

