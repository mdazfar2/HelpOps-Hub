import Blogs from "@utils/models/blog";  // Importing Mongoose model for blog collection
import user from "@utils/models/user";
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility


export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const {user_id,blog_id} = await req.json();

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
       
        // Create a new instance of Blogs model with the received payload
        let user1 = await user.findById(user_id)
     
        user1.blockedBlogs=user1.blockedBlogs.filter((data)=>data!==blog_id)
        await user1.save()
        // Save the new blog record to MongoDB
        // Return success response with saved blog details
        return NextResponse.json({success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}



