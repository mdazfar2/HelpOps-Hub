import Questions from "@utils/models/question";  // Importing Mongoose model for blog collection
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server";  // Importing Next.js server response utility
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription


export async function POST(req) {
    try {
        // Parse JSON payload from request body
        const {id,authorImage,authorName,userId} = await req.json();

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        // Create a new instance of Blogs model with the received payload
        let blog = await Questions.findById(id)
        let isHave=false
        blog.questionrelatedusers.map((data)=>{
            if(data.authorName==authorName){
                isHave=true
            }
        })
        let users=await user.findById(userId)
        users.questiontoo.push(id)
        await user.findByIdAndUpdate(userId,{
            $set:users
        })
        if(!isHave){
            blog.questionrelatedusers.push({authorImage:authorImage,authorName:authorName,authorId:userId})
        }
        // Save the new blog record to MongoDB
        const result = await Questions.findByIdAndUpdate(id,{
            $set:blog
        })
        // Return success response with saved blog details
        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
export async function DELETE(req) {
    try {
        // Parse JSON payload from request body
        const {id,userId} = await req.json();

        const { MONGO_URI } = process.env;  
        
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        // Create a new instance of Blogs model with the received payload
        let blog = await Questions.findById(id)
        let users=await user.findById(userId)
        users.questiontoo=users.questiontoo.filter((d)=>d!==id)
        blog.questionrelatedusers= blog.questionrelatedusers.filter((data)=>data.authorName!==users.name)
        await user.findByIdAndUpdate(userId,{
            $set:users
        })
        // Save the new blog record to MongoDB
        const result = await Questions.findByIdAndUpdate(id,{
            $set:blog
        })
        // Return success response with saved blog details
        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in POST /api/blog:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}


