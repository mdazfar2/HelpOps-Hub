import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function POST(req) {
        const { MONGO_URI } = process.env; 
        let {id,tagname}=await req.json()
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        let data=await user.findById(id)
        data.followedTags.push(tagname)
        await data.save()
        let user1=await user.findById(id)
        return NextResponse.json({success:true,user:user1})}
export async function PUT(req) {
    const { MONGO_URI } = process.env; 
    let {id,tagname}=await req.json()
    
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGO_URI);
    let data=await user.findById(id)
    data.followedTags.filter((name)=>name!==tagname)
    await data.save()
    let user1=await user.findById(id)
    return NextResponse.json({success:true,user:user1})
}

