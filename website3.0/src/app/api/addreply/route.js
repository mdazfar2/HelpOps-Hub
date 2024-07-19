import Blogs from "@utils/models/blog";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility



export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const {comment_id,user_name,blog_id,comment,index,image} = await req.json();
        
        const { MONGO_URI } = process.env;  
        await mongoose.connect(MONGO_URI);
        let blog=await Blogs.findById(blog_id)
        blog.comments[index].replies.push({name:user_name,comment:comment,image:image})
        

        // Save the new blog record to MongoDB
       await blog.save();
        
        // Return success response with saved blog details
        return NextResponse.json({  success: true ,comment:blog.comments[index].replies});
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}


