import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility
const bcrypt = require("bcrypt");
const saltRounds = 10;
import newaccount from "@utils/models/newaccounts"; // Importing Mongoose model for newsletter subscription

export async function POST(req) {
  const { MONGO_URI } = process.env;
  let { email, name, password, image, username, banner } = await req.json();

  // Connect to MongoDB using Mongoose
  await mongoose.connect(MONGO_URI);
  let data = await user.find({ email: email });
  // checking if user exist or not
  if (data.length > 0) {
    let date=Date.now()
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
  
    let result = await newaccount.findOne({purpose:"account"});
    if(!result.accounts[formattedDate]){
      result.accounts[formattedDate]=[0,0]
    }
    result.accounts[formattedDate][1]+=1
    console.log(result.accounts,'ACCOUNTTTTTTTTTT')
    await newaccount.findByIdAndUpdate(result._id,{
      $set:result
    })
    return NextResponse.json(
      { success: true, msg: data[0] },
      { status: "200" }
    );
  }
  // generating the hash to store in mongo db
  if (password) {
    const hash = await bcrypt.hash(password, saltRounds);

    let map = new Map();
    map.set(new Map());
    // Creating a new user in the database
    let users = user({
      email: email,
      name: name,
      username: username,
      password: hash,
      image1: String(image),
      banner: String(image),
      designation: "",
      linkedin: "",
      github: "",
      caption: "",
      followers: new Map(),
      following: new Map(),
      reactions: new Map(),
      likedBLogs: map,
    });
    await users.save();
  }
   else {
    let us = await user.find({ email: email });
    if (us.length > 0) {
      return NextResponse.json({ success: true, user: us }, { status: 200 });
    }
    let map = new Map();
    let map1 = new Map();
    map1.set("sdsd", "sdsd");
    map.set(map1);
    let users = user({
      email: email,
      username: username,
      name: name,
      image1: image,
      banner: banner,
      designation: "",
      linkedin: "",
      github: "",
      caption: "",
      followers: new Map(),
      following: new Map(),
      reactions: new Map(),
      likedBLogs: map,
    });
    await users.save();
    let data1 = await user.find({ email: email });
    await user.findByIdAndDelete(data1[0]._id);
  }
  let date=Date.now()
  const formattedDate = new Date(date).toISOString().split('T')[0]; // Format date to YYYY-MM-DD

  let result = await newaccount.findOne({purpose:"account"});
  
  if(!result.accounts[formattedDate]){
    result.accounts[formattedDate]=[0,0]
  }
  result.accounts[formattedDate][0]+=1
  await newaccount.findByIdAndUpdate(result._id,{
    $set:result
  })
  let data1 = await user.find({ email: email });
  // await user.deleteOne({email:email})
  //sending response user
  return NextResponse.json({ success: true, user: data1[0] });
}
