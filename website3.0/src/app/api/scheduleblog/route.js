import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Blogs from "@utils/models/blog";  // Importing Mongoose model for blog collection
import { scheduleJob } from "node-schedule";
export async function POST(req){
    let payload=await req.json()
    const { MONGO_URI } = process.env;  

    const scheduledTime = new Date(payload.datetime);
    scheduleJob(scheduledTime, async () => {
        // This function will run at the scheduled dateTime
        await mongoose.connect(MONGO_URI);
        if(!payload.image){
            payload.image=""
        }
        if(!payload.description)
        {
            payload.description=""
        }
        // Create a new instance of Blogs model with the received payload
        let blog = new Blogs(payload);

        // Save the new blog record to MongoDB
        const result = await blog.save();

        // Here you can perform any actions you want to execute at the scheduled time
        // For example, trigger an email, update a database, etc.

        return NextResponse.json({success:true},{status:"200"})
    });
      return NextResponse.json({success:true},{status:"200"})
}