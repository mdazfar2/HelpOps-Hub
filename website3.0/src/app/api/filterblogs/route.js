import Blogs from "@utils/models/blog";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility

export async function POST(req) {
    const { MONGO_URI } = process.env; 
    console.log(req)
     let {id}=await req.json()
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI);
    let data = [];
    data = await Blogs.find();
    if(id!==undefined && id.length>0){
       data= data.filter((r)=>r.tags.includes(id))
        console.log(data)
    }
    return NextResponse.json({data});
}