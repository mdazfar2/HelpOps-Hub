import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility

export async function POST(req) {
        const { MONGO_URI } = process.env; 
        let {email}=await req.json()
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
       await user.findOneAndDelete({email:email})
       return NextResponse.json({success:true},{status:200})
}


