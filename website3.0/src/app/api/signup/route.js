import { connectionStr } from "@utils/db";  // Importing database connection string from utils/db
import NewsLetterSubscribe from "@utils/models/newslettersub";  // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse} from "next/server";  // Importing Next.js server response utility
import { Resend } from 'resend';

// import {Emailtemplate} from '../../../../components/Emailtemplate'
const resend = new Resend('re_TjBzktuh_5c33Vdr61QnMG416VnsNuDiS');
let users=new Map()

export async function POST(req) {

    try {
        
        const { email , isSend} = await req.json();  // Extract email from request body

        
       async function send(){
            let otp = '';
            function generateOTP() {
                for (let i = 0; i < 6; i++) {
                  otp += Math.floor(Math.random() * 10);
                }
              
              }
              generateOTP()
              // Extract email from request body
              const { data, error } = await resend.emails.send({
                  from: 'Acme <onboarding@resend.dev>',
                  to: ['loviagarwal1209@gmail.com'],
                  subject: 'Hello world',
                  react:`Your otp is ${otp}`,
                });
                users.set(email,otp)
        }
        if(isSend){
            send()
            return NextResponse.json({success:true})
        }else{
       let otp=await users.get(email)
       console.log(otp)
          return NextResponse.json({ success: true,otp: otp},{status:"200"});

        }
       
    } catch (error) {
        console.error("Error in POST /api/check-email:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}