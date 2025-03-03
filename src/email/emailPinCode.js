import nodemailer from "nodemailer";
import { generateEmailTemplatePinCode } from "./emailHtml.js";

export const sendEmailPcode = async (userEmail, pinCode, subjectOfEmail) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mg7634852@gmail.com",
            pass: "nbhiziuqekrutkwf",
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: `"Pick-Proprerty" <mg7634852@gmail.com>`, // sender address
        to: userEmail,
        subject: `PIN CODE > "${subjectOfEmail}"`, // list of receivers// Subject line
        html: generateEmailTemplatePinCode(userEmail, pinCode), // html body
    });

    console.log("Message sent: %s", info.messageId);
};