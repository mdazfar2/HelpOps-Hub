import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function POST(req) {
        const { MONGO_URI } = process.env; 
        let {id}=await req.json()
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        try{

            let data=await user.findById({_id:id})
            console.log("the data is ",data)
            // checking if user exist or not 
            if(data){
              return NextResponse.json({ success: true,msg:data},{status:"200"});
            }
           else{
            return NextResponse.json({ success: false},{status:"200"});
    
           }
        }catch{
            return NextResponse.json({ success: false},{status:"200"});

        }
}


