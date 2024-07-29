import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility
const bcrypt = require("bcrypt");
const saltRounds = 10;
import newaccount from "@utils/models/newaccounts"; // Importing Mongoose model for newsletter subscription

export async function GET() {
  const { MONGO_URI } = process.env;

  // Connect to MongoDB using Mongoose
  await mongoose.connect(MONGO_URI);

  let result = await newaccount.findOne({purpose:"account"});
  
  return NextResponse.json({ success: true, result: result });
}
