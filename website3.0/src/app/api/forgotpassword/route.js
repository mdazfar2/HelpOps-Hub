import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse} from "next/server";  // Importing Next.js server response utility
import nodemailer from 'nodemailer'
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
var jwt = require('jsonwebtoken');


export async function POST(req) {

    try {
      const { MONGO_URI } = process.env; 
      const { email,} = await req.json();  // Extract email from request body
     //for connecting with db 
     console.log(email)
      await mongoose.connect(MONGO_URI);
      // for finding the user 
      let data=await user.find({email:email})
      // checking if user exist or not 
      console.log(data)
      if(data.length==0){
        return NextResponse.json({ success: false,msg:"User Doesn't Valid"},{status:"200"});
      }
      //comparing the password
   let token= jwt.sign(email, 'myanemislovu')
   console.log(token)
   let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_APP_PASS,
    },
  });

  // Set up email options
  let mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Welcome to HelpOps-Hub Community!",
    html: `
            Please click on this link to change your password https://www.helpopshub.com/?token=${token}
`,
  };

  // Send email
 let res= await transporter.sendMail(mailOptions);
 console.log(res)  
 return NextResponse.json({ success: true},{status:"200"});

       
    } catch (error) {
        console.error("Error in POST /api/check-email:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
