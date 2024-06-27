import { connectionStr } from "@utils/db";  // Importing database connection string from utils/db
import NewsLetterSubscribe from "@utils/models/newslettersub";  // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility

export async function POST(req) {
    try {
        const { email } = await req.json();  // Extract email from request body
        console.log("Checking email:", email);

        await mongoose.connect(connectionStr);

        // Find the email in the database
        const user = await NewsLetterSubscribe.findOne({ email });
        if (user) {
            console.log("Email exists in the database.");
            return NextResponse.json({ exists: true });
        } else {
            console.log("Email does not exist in the database.");
            return NextResponse.json({ exists: false });
        }
    } catch (error) {
        console.error("Error in POST /api/check-email:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}