import Questions from "@utils/models/question";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription

export async function GET(req) {
    try {
        // Parse JSON payload from request body

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);

        // Create a new instance of Blogs model with the received payload
        let question = await Questions.find()
        // Return success response with saved blog details
        return NextResponse.json({ data:question, success: true });
    } catch (error) {
        console.error("Error in POST /api/Question:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const payload = await req.json();

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);

        // Create a new instance of Blogs model with the received payload
        let blog = new Questions(payload);
        let users=await user.findById(payload.authorId)
        users.questions+=1
        await user.findByIdAndUpdate(payload.authorId,{
            $set:users
        })
        // Save the new blog record to MongoDB
        const result = await blog.save();
        console.log(result)
        // Return success response with saved blog details
        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

