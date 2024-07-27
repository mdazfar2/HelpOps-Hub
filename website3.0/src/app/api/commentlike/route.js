import Blogs from "@utils/models/blog";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility



export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const {comment_id,blog_id,isDelete,user_id,index} = await req.json();
        
        const { MONGO_URI } = process.env;  
        await mongoose.connect(MONGO_URI);
        let blog=await Blogs.findById(blog_id)
        if(isDelete){
            blog.comments[index].likes=blog.comments[index].likes-1
                blog.comments[index].likeusers=blog.comments[index].likeusers.filter(data=>data!==user_id) 
                await blog.save();
                blog=await Blogs.findById(blog_id)
                return NextResponse.json({  success: true });

        }



        blog.comments[index].likes=blog.comments[index].likes+1
        let arr= blog.comments[index].likeusers
        arr= [...arr,user_id]
      blog.comments[index].likeusers=[...arr]
        // Save the new blog record to MongoDB
        
        await blog.save();
        blog=await Blogs.findById(blog_id)
        // Return success response with saved blog details
        return NextResponse.json({  success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}


