import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse} from "next/server";  // Importing Next.js server response utility
import nodemailer from 'nodemailer'
import resource from "@utils/models/resource"; // Importing Mongoose model for newsletter subscription
var jwt = require('jsonwebtoken');
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription


export async function GET(req) {

    try {
      const { MONGO_URI } = process.env; 
      await mongoose.connect(MONGO_URI);
      let count=await resource.find()
      return NextResponse.json({ success: true,msg:count},{status:"200"});
    } catch (error) {
        console.error("Error in POST /api/check-email:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
