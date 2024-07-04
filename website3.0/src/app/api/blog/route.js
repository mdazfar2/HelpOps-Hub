import Blogs from "@utils/models/blog";  // Importing Mongoose model for newsletter subscription
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
