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
      await mongoose.connect(MONGO_URI);
        // checking if user present
      let isPresent=await user.find({email:email})
      //giving eerror if user already present 
      if(isPresent.length>0){
          return NextResponse.json({success:false})

      }
     
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
                  user: process.env.EMAIL_ID,
                  pass: process.env.EMAIL_APP_PASS,
                },
            })
            let mail=await transport.sendMail({
                from: '"Help-ops Hub" <helpopshub@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Your HelpOps-Hub Verification Code", // Subject line
    text: otp, // plain text body
    html: `<b>𝐓𝐨 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐞 𝐲𝐨𝐮𝐫 𝐬𝐢𝐠𝐧𝐮𝐩 𝐩𝐫𝐨𝐜𝐞𝐬𝐬, 𝐩𝐥𝐞𝐚𝐬𝐞 𝐮𝐬𝐞 𝐭𝐡𝐞 𝐎𝐧𝐞-𝐓𝐢𝐦𝐞 𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝 (𝐎𝐓𝐏) 𝐛𝐞𝐥𝐨𝐰 𝐭𝐨 𝐯𝐞𝐫𝐢𝐟𝐲 𝐲𝐨𝐮𝐫 𝐆𝐦𝐚𝐢𝐥 𝐚𝐜𝐜𝐨𝐮𝐧𝐭:
<br><br>𝐘𝐨𝐮𝐫 𝐎𝐓𝐏: ${otp}</b> <br><br><br>Enter this code on the verification page to finish setting up your account. For security reasons, this OTP is valid for 10 minutes.
<br>If you did not request this, please ignore this email.<br><br>
<br>Thank you for joining HelpOps-Hub!
<br>Best regards,
<br>The HelpOps-Hub Team 🚀
`, // html body
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
