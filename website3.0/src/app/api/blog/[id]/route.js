import Blogs from "@utils/models/blog";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    const { MONGO_URI } = process.env;

    await mongoose.connect(MONGO_URI);

    try {
        const blog = await Blogs.findById(id);

        if (blog) {
            return NextResponse.json(blog);
        } else {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error in GET /api/blog/[id]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { MONGO_URI } = process.env;

    await mongoose.connect(MONGO_URI);

    try {
        const { comment, user, reactionType } = await req.json();
        const blog = await Blogs.findById(id);

        if (blog) {
            if (comment && user) {
                blog.comments = [...blog.comments, { comment, user }];
            }
            
            if (reactionType) {
                const reactionIndex = blog.reactionList.findIndex(reaction => reaction.type === reactionType);
                if (reactionIndex !== -1) {
                    blog.reactionList[reactionIndex].count += 1;
                } else {
                    blog.reactionList.push({ type: reactionType, count: 1 });
                }
            }

            await blog.save();
            return NextResponse.json(blog);
        } else {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error in PUT /api/blog/[id]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}