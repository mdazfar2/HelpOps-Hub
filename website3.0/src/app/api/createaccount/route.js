import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function POST(req) {
        const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
        const MONGO_URI_CREATE_ACCOUNT = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.iol43dc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    
        let {email,name,password}=await req.json()
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI_CREATE_ACCOUNT);
        bcrypt.hash(password, saltRounds,async function(err, hash) {
                console.log(hash,email,name,password)
               let data = await user.create({
                    email:email,name:name,password:hash
                });
            });
        
            return NextResponse.json({success:true})
}

// POST endpoint to handle new newsletter subscriptions

