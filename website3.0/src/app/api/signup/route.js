import NewsLetterSubscribe from "@utils/models/newslettersub";  // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse} from "next/server";  // Importing Next.js server response utility
import nodemailer from 'nodemailer'
let users=new Map()
import user from "@utils/models/user"; // Importing Mongoose model for Getting details of already present user 

export async function POST(req) {

    try {
      const { MONGO_URI } = process.env; 
      const { email , isSend} = await req.json();  // Extract email from request body
      console.log(email)
      let isPresent=await user.find({email:email})
      if(isPresent.length>0){
          return NextResponse.json({success:false})

      }
      console.log(isPresent)
       async function send(){
            let otp = '';
            function generateOTP() {
                for (let i = 0; i < 6; i++) {
                  otp += Math.floor(Math.random() * 10);
                }
              
              }
              generateOTP()
              // Extract email from request body
              const transport=await nodemailer.createTransport({
                service:'gmail',
                port: 587,
                secure:false,
                auth: {
                  user: "loviagarwal55@gmail.com",
                  pass: "hsqiflquplixfewi",
                },
            })
            let mail=await transport.sendMail({
                from: '"Lovi" <loviagarwal55@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "OTP", // Subject line
    text: otp, // plain text body
    html: `<b>${otp}</b>`, // html body
            })
            
                users.set(email,otp)
        }
        if(isSend){
           await  send()
            return NextResponse.json({success:true})
        }else{
       let otp=await users.get(email)
          return NextResponse.json({ success: true,otp: otp},{status:"200"});

        }
       
    } catch (error) {
        console.error("Error in POST /api/check-email:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
