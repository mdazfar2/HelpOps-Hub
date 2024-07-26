import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server"; // Importing Next.js server response utility
import { Resend } from "resend";
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
let jwt = require("jsonwebtoken");

// import {Emailtemplate} from '../../../../components/Emailtemplate'
const bcrypt = require("bcrypt");

export async function POST(req) {
  try {
    const { MONGO_URI } = process.env;
    const { token, password } = await req.json(); // Extract email from request body
    //for connecting with db
    await mongoose.connect(MONGO_URI);
    // for finding the user
    let user1 = await jwt.decode(token);
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.updateOne(
      { email: user1 },
      { $set: { password: hashedPassword } }
    );
    //returning user for correct pass
    return NextResponse.json({ success: true }, { status: "200" });
  } catch (error) {
    console.error("Error in POST /api/check-email:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
