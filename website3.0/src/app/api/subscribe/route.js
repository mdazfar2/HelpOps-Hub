import { connectionStr } from "@utils/db";  // Importing database connection string from utils/db
import NewsLetterSubscribe from "@utils/models/newslettersub";  // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility

// GET endpoint to fetch newsletter subscription data
export async function GET() {
    let data = [];  // Initialize variable to store fetched data
    
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(connectionStr);
        
        // Fetch all newsletter subscription records
        data = await NewsLetterSubscribe.find();
    } catch (error) {
        // If an error occurs during database connection or query, return error response
        data = { success: false };
    }
    
    // Return fetched data as JSON response
    return NextResponse.json({ result: data });
}

// POST endpoint to handle new newsletter subscriptions
export async function POST(req) {
    // Parse JSON payload from request body
    const payload = await req.json();
    
    // Connect to MongoDB using Mongoose
    await mongoose.connect(connectionStr);
    
    // Create a new instance of NewsLetterSubscribe model with the received payload
    let subscribe = new NewsLetterSubscribe(payload);
    
    // Save the new subscription record to MongoDB
    const result = await subscribe.save();
    
    // Return success response with saved subscription details
    return NextResponse.json({ result, success: true });
}
