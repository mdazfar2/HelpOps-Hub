import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server"; // Importing Next.js server response utility

export async function POST(req) {
        const { MONGO_URI } = process.env; 
        let {user_id,other_user_id}=await req.json()
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);
        //getting the data from db of both users 
        let data=await user.findById({_id:user_id})
        let data2=await user.find({email:other_user_id})
        let count=data.followers
        let count2=data2[0].followers
        count.delete(data2[0]._id)
        // Updating arrays for followers 
        count2.delete(user_id)
        // updating the followers for followed user 
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
        return NextResponse.json({success:true,user:data})
}


