import Blogs from "@utils/models/blog";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility

export async function GET() {
    const { MONGO_URI } = process.env;  
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI);
    let data = [];
    data = await Blogs.find();
    return NextResponse.json({data});
}

export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const payload = await req.json();

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        if(!payload.image){
            payload.image=""
        }
        if(!payload.description)
        {
            payload.description=""
        }
        // Create a new instance of Blogs model with the received payload
        let blog = new Blogs(payload);

        // Save the new blog record to MongoDB
        const result = await blog.save();

        // Return success response with saved blog details
        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function PUT(req) {
    try {
        // Parse JSON payload from request body
        const {payload} = await req.json();

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
       
        // Create a new instance of Blogs model with the received payload
        let blog =await  Blogs.findByIdAndUpdate(payload.id,{
            $set:payload
        });

        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function DELETE(req) {
    try {
        const {id} = await req.json();

        const { MONGO_URI } = process.env;
        await mongoose.connect(MONGO_URI);

        const blog = await Blogs.findById(id);
        if (!blog) {
            return NextResponse.json({ success: false, error: "Blog not found." }, { status: 404 });
        }

        blog.isDeleted = true;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
        blog.expiryDate = expiryDate;
        const result = await blog.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in DELETE /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
