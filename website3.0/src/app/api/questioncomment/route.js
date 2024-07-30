import Questions from "@utils/models/question";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility
import { comment } from "postcss";

export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const {id,comment,user_id,userEmail,userName,image} = await req.json();

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);

        // Create a new instance of Blogs model with the received payload
        let question = await Questions.findById(id)
        let date=new Date(Date.now())
        question.comments.push({comment:comment,user:user_id,userEmail:userEmail,userName:userName,date:date,image:image})
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

