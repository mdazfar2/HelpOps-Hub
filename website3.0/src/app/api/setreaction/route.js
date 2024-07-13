import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server"; // Importing Next.js server response utility
import Blogs from "@utils/models/blog";

export async function POST(req) {
        const { MONGO_URI } = process.env; 
        let {user_id,blog_id,reaction}=await req.json()
        // Connect to MongoDB using Mongoose
        try{

            await mongoose.connect(MONGO_URI);
            const blog = await Blogs.findById(blog_id);
            const reactionIndex = blog.reactionList.findIndex(reaction => reaction.type === 'save');
            if (reactionIndex !== -1) {
                blog.reactionList[reactionIndex].count += 1;
            } else {
                blog.reactionList.push({ type: 'save', count: 1 });
            }
            await blog.save()
            //getting the data from db of both users 
            let data=await user.findById({_id:user_id})
            let reactionArray=data.reactions||new Map()
            reactionArray.set(blog_id,reaction)
            
            if(reaction=='0'){
                return NextResponse.json({success:true,user:data})
    
            }else if(reaction=='1'){
                return NextResponse.json({success:true,user:data})
    
            }else {
                console.log(reactionArray)
                data= await user.findByIdAndUpdate({_id:user_id},{
                    $set:{
                        reactions:reactionArray
                    }
                } ,{ new: true }) 
                console.log(data)
                return NextResponse.json({success:true,user:data})
    
            }
        }catch{
            return NextResponse.json({success:false})

        }
}


