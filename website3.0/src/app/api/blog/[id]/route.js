import Blogs from "@utils/models/blog";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility

export async function GET(req, { params }) {
    const { id } = params;  // Extracting the blog ID from request parameters
    const { MONGO_URI } = process.env;  
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI);
    try {
        // Find the blog by ID
        const blog = await Blogs.findById(id);

        // Return the found blog
        if (blog) {
            return NextResponse.json(blog);
        } else {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error in GET /api/blog/[id]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;  // Extracting the blog ID from request parameters
    const { MONGO_URI } = process.env;  
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI);
    try {
        const { comment, user } = await req.json();  // Extract comment and user from request body

        // Find the blog by ID and update comments
        const blog = await Blogs.findById(id);
        if (blog) {
            blog.comments = [...blog.comments, { comment, user }];
            await blog.save();
            return NextResponse.json(blog);
        } else {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error in PUT /api/blog/[id]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
