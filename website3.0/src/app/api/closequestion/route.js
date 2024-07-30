import Questions from "@utils/models/question";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility

export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const {id,user_id} = await req.json();

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);

        // Create a new instance of Blogs model with the received payload
        let question = await Questions.findById(id)

        if(question.isCLose){
            question.isCLose=false
        }else{
            question.isCLose=true
        }
        await Questions.findByIdAndUpdate(id,{
            $set:question
        })
        // Return success response with saved blog details
        return NextResponse.json({ data:question, success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

