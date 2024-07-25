import Blogs from "@utils/models/blog";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility


export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const payload = await req.json();

        const { MONGO_URI } = process.env;  
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        let blog=await Blogs.findById(payload.id)
        // Create a new instance of Blogs model with the received payload
        blog.views=blog.views+1
        await Blogs.findByIdAndUpdate(payload.id,{
            $set:blog
        })

        // Save the new blog record to MongoDB
        

        // Return success response with saved blog details
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
export async function PUT(req) {
    try {
        // Parse JSON payload from request body
        const payload = await req.json();

        const { MONGO_URI } = process.env;  
        console.log(payload.time,'assssssssssssssssssssssssssssssssssddadadadad')
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        let blog=await Blogs.findById(payload.id)

        // Create a new instance of Blogs model with the received payload
        blog.average=(blog.average+payload.time)/payload.views
        blog.average=Math.ceil(blog.average)
        await Blogs.findByIdAndUpdate(payload.id,{
            $set:blog
        })

        // Save the new blog record to MongoDB
        

        // Return success response with saved blog details
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

