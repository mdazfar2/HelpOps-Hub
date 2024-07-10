import ContactUs from "@utils/models/contactus"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server"; // Importing Next.js server response utility
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parse JSON payload from request body
    const payload = await req.json();

    const { MONGO_URI, EMAIL_ID, EMAIL_APP_PASS } = process.env;

    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI);

    // Create a new instance of ContactUs model with the received payload
    let contact = new ContactUs(payload);

    // Save the new contact record to MongoDB
    const result = await contact.save();

    // Set up Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: EMAIL_ID,
        pass: EMAIL_APP_PASS,
      },
    });

    // Set up acknowledgment email options
    let mailOptions = {
      from: EMAIL_ID,
      to: payload.email,
      subject: "Thank You for Contacting HelpOps",
      html: `
                    <div style="font-family: Arial, sans-serif; color: #000; background-color: #FEAA45; padding: 20px;">
                    <div style="background-color: #FDD86C; padding: 20px; text-align: center;margin-bottom:20px;border-radius:10px ">
                        <img src="https://i.ibb.co/kQzH6t8/Help-Ops-H-Fevicon.png" alt="HelpOps Logo" style="max-width: 100px; margin-bottom: 20px;">
                    </div>
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #FEAA45; text-align: center;">Thank You for Reaching Out!</h2>
                        <p>Dear ${payload.name},</p>
                        <p>Thank you for contacting HelpOps. We have received your message and will get back to you soon.</p>
                        <p>Thanks for reaching out to HelpOps!</p>
                        <p>Best regards,</p>
                        <p>The HelpOps Team</p>
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="font-size: 12px; color: #666;">HelpOps, 1234 Street Address, City, State, 12345</p>
                    </div>
                </div>
            `,
    };

    // Send acknowledgment email
    await transporter.sendMail(mailOptions);

    // Return success response with saved contact details
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error in POST /api/contact:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
