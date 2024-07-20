import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function POST(req) {
        const { MONGO_URI } = process.env; 
        let {email,username,password,image}=await req.json()
        await mongoose.connect(MONGO_URI);

        let res=await user.find({username:username})
        console.log("responsseeee",res)
        if(res.length>0){
            return NextResponse.json({ success: false,msg:"This Username is not available "},{status:"200"});

        }else{
            return NextResponse.json({ success: true},{status:"200"});

        }
       
}
export async function PUT(req) {
    const { MONGO_URI } = process.env; 
    let {id,username}=await req.json()

    let res=await user.findByIdAndUpdate(id,{
        $set:{
            username:username
        }
    },{new:true})
   console.log(res,id,username)
        return NextResponse.json({ success: true},{status:"200"});

    
   
}


