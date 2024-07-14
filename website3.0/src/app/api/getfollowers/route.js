import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server"; // Importing Next.js server response utility

export async function POST(req) {
        const { MONGO_URI } = process.env; 
        let {user_id}=await req.json()
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        //getting the data from db of both users 
        let data=await user.findById({_id:user_id})
        let data2=await user.find({email:other_user_id})
        let count=data.followers
        let count2=data2[0].followers
        count.set(data2[0]._id,[data2[0].image1,data2[0].name])
        // Updating arrays for followers 
        count2.set(user_id,[data.image1,data.name])
        // updating the followers for followed user 
        console.log(count,count2)
    data= await user.findByIdAndUpdate({_id:user_id},{
            $set:{
                followers:count
            }
        } ,{ new: true }) 
        // updating the followinf done by the user 
   await user.findOneAndUpdate({email:other_user_id},{
            $set:{
                following:count2
            }
        }) 
        console.log(data)
        return NextResponse.json({success:true,user:data})
}


