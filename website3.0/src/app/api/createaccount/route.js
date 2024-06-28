import { connectionStr } from "@utils/db"; // Importing database connection string from utils/db
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function POST(req) {
   
        let {email,name,password}=await req.json()
        // Connect to MongoDB using Mongoose
        await mongoose.connect(connectionStr);
        bcrypt.hash(password, saltRounds,async function(err, hash) {
                console.log(hash,email,name,password)
               let data = await user.create({
                    email:email,name:name,password:hash
                });
            });
        
            return NextResponse.json({success:true})
}

// POST endpoint to handle new newsletter subscriptions

