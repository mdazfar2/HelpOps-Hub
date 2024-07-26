import Blogs from "@utils/models/blog";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility

export async function POST(req) {
    const { MONGO_URI } = process.env; 
     let {id}=await req.json()
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI);
    let data = [];
    data = await Blogs.find();
    if(id!==undefined && id.length>0){
       data= data.filter((r)=>r.tags.includes(id))
    }
    return NextResponse.json({data});
}