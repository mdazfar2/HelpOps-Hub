import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility
const bcrypt = require("bcrypt");
const saltRounds = 10;

export async function POST(req) {
  const { MONGO_URI } = process.env;
  let { email } = await req.json();
  // Connect to MongoDB using Mongoose
  await mongoose.connect(MONGO_URI);
  try {
    let data = await user.find({ email: email });
    console.log("the data is ", data);
    // checking if user exist or not
    if (data.length > 0) {
      console.log(data);

      return NextResponse.json(
        { success: true, msg: data[0] },
        { status: "200" }
      );
    } else {
      console.log(data);
      return NextResponse.json({ success: false }, { status: "200" });
    }
  } catch {
    return NextResponse.json({ success: false }, { status: "200" });
  }
}
