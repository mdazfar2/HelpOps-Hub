import ContactUs from "@utils/models/contactus";  // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility

export async function POST(req) {
    // Parse JSON payload from request body
    const payload = await req.json();

    const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
    const MONGO_URI_CONTACT = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.iol43dc.mongodb.net/Contact?retryWrites=true&w=majority&appName=Cluster0`;
    
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI_CONTACT);

    // Create a new instance of ContactUs model with the received payload
    let contact = new ContactUs(payload);

    // Save the new contact record to MongoDB
    const result = await contact.save();

    // Return success response with saved contact details
    return NextResponse.json({ result, success: true });
}
