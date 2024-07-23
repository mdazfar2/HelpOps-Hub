import Blogs from "@utils/models/blog";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription


export async function DELETE(req) {
    const { index,id,id_user} = await req.json();
    const { MONGO_URI } = process.env;

    await mongoose.connect(MONGO_URI);

    try {
        const blog = await Blogs.findById(id);
        blog.comments=blog.comments.filter((data,index1)=>index1!==index)
        await blog.save()
        
        return NextResponse.json({success:true,blog:blog}, { status: 200 });

    } catch (error) {
        console.error("Error in PUT /api/blog/[id]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function PUT(req) {
    const { index,id,comment} = await req.json();
    const { MONGO_URI } = process.env;

    await mongoose.connect(MONGO_URI);

    try {
        const blog = await Blogs.findById(id);
        blog.comments[index].comment=comment
        await blog.save()
        
        return NextResponse.json({success:true,blog:blog}, { status: 200 });

    } catch (error) {
        console.error("Error in PUT /api/blog/[id]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}