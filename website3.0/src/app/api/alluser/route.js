import user from "@utils/models/user"; 
import mongoose from "mongoose";
import { NextResponse } from "next/server"; 

export async function POST(req) {
  const { MONGO_URI } = process.env;
  
  await mongoose.connect(MONGO_URI);

  try {
    let data = await user.find({});
    if (data.length > 0) {
      return NextResponse.json({ success: true, msg: data }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, msg: "No users found" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, msg: "Error fetching users" }, { status: 500 });
  }
}
