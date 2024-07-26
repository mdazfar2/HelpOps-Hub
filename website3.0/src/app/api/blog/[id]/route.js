import Blogs from "@utils/models/blog";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription

export async function GET(req, { params }) {
    const { id } = params;
    const { MONGO_URI } = process.env;

    await mongoose.connect(MONGO_URI);

    try {
        const blog = await Blogs.findById(id);
        let user;
       
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
    const { id} = params;
    const { MONGO_URI } = process.env;

    await mongoose.connect(MONGO_URI);

    try {
        const { comment, user1, reactionType } = await req.json();
        let blog = await Blogs.findById(id);
        let   userData;
        if(reactionType=='Icon1'||reactionType=='Icon3'||reactionType=='Icon2'){
             let   userData=await user.findById({_id:user1._id})
             let id1=String(id)
             if(!userData.likedBlogs.has(id)){

                if(userData.likedBlogs){
                   let map=new Map()
                       map.set(reactionType,true)
                    userData.likedBlogs.set(id1,map)
                    userData=   await  userData.save()

                }  else{
                   let map=new Map()
                   map.set(reactionType,true)
                   userData.likedBlogs=new Map()
                   userData.likedBlogs.set(id1,map)

                   userData=   await  userData.save()
               }
            }
             else{
                let map=new Map(Object.entries(userData.likedBlogs.get(id)))
                map.set(reactionType,true)
                userData.likedBlogs.set(id,map)
                    await userData.save()
                
             }
             
        }
        
        if (blog) {
            if (comment && user1) {
                blog.comments = [...blog.comments, { comment, user:user1 }];
            }
            
            if (reactionType) {
                const reactionIndex = blog.reactionList.findIndex(reaction => reaction.type === reactionType);
                if (reactionIndex !== -1) {
                    blog.reactionList[reactionIndex].count += 1;
                } else {
                    blog.reactionList.push({ type: reactionType, count: 1 });
                }
            }

           blog=  await blog.save();
            return NextResponse.json(blog);
        } else {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error in PUT /api/blog/[id]:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function DELETE(req, { params }) {
    const { id} = params;
    const { MONGO_URI } = process.env;

    await mongoose.connect(MONGO_URI);

    try {
        const {  user1, reactionType } = await req.json();
        const blog = await Blogs.findById(id);
        let   userData=await user.findById({_id:user1._id})
       let map=new Map(Object.entries(userData.likedBlogs.get(id)))
       map.delete(reactionType)
       userData.likedBlogs.set(id,map)

           await userData.save()
           
             
      
        
        if (blog) {
            
            if (reactionType) {
                const reactionIndex = blog.reactionList.findIndex(reaction => reaction.type === reactionType);
                    blog.reactionList[reactionIndex].count -= 1;
                
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