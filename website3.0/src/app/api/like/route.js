import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse} from "next/server";  // Importing Next.js server response utility
import nodemailer from 'nodemailer'
import resource from "@utils/models/resource"; // Importing Mongoose model for newsletter subscription
var jwt = require('jsonwebtoken');
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription


export async function POST(req) {

    try {
      const { MONGO_URI } = process.env; 
      const {path,isDelete,id} = await req.json()
      await mongoose.connect(MONGO_URI);
      console.log(id)
      let count=await user.findById({_id:id})
      if(!isDelete){

        count.resource.set(path,true)
        await count.save()
        let user1=await user.findById({_id:id})
        console.log(user1)

        return NextResponse.json({ success: true,user:user1},{status:"200"});

      }else{
        
        count.resource.delete(path)
        await count.save()
        let user1=await user.findById({_id:id})
      console.log(user1)
        return NextResponse.json({ success: true,user:user1},{status:"200"});
      }
      // if(count.length==0){
      //   if(isDelete){
      //     return NextResponse.json({ success: true},{status:"200"});

      //   }

      //     let data=  resource({
      //       resourcePath:path,
      //       likeCount:1
      //   });
      //   await  data.save()
      // }else{
      //   if(isDelete){
      //     if(count[0].likeCount==1){
      //       await resource.findByIdAndDelete({_id:count[0]._id})
      //       return NextResponse.json({ success: true},{status:"200"});
      //     }
      //     await resource.findByIdAndUpdate({_id:count[0]._id},{
      //       $set:{
      //           likeCount:count[0].likeCount-1
      //       }
      //   })
      //   return NextResponse.json({ success: true},{status:"200"});

      //   }
      //   await resource.findByIdAndUpdate({_id:count[0]._id},{
      //       $set:{
      //           likeCount:count[0].likeCount+1
      //       }
      //   })
      // }

 return NextResponse.json({ success: true},{status:"200"});

       
    } catch (error) {
        console.error("Error in POST /api/check-email:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
