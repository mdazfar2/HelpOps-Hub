import NewsLetterSubscribe from "@utils/models/newslettersub";  // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose";  // Importing Mongoose for MongoDB interactions
import { NextResponse} from "next/server";  // Importing Next.js server response utility
import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription

export async function POST(req) {

    try {
      const { MONGO_URI } = process.env; 
      const a= await req.json();  // Extract email from request body
     //for connecting with db 
     console.log(a.formData,a.image)
      await mongoose.connect(MONGO_URI);
      // for finding the user 
      let data=await user.find({email:a.email})
     console.log("user is ",data)
   let data1=await user.findOneAndUpdate({email:a.email},{
    $set:{
        image1:a.image,
        designation:a.formData.designation,
        caption:a.formData.caption,
        github:a.formData.github,
        linkedin:a.formData.linkedin,
    }
   }, { new: true })
   // Checking for incorrect pass 
   data1=await user.find({email:a.email})
 console.log('sddddddddddddddddd',data1[0])
   //returning user for correct pass 
   return NextResponse.json({ success: true,user:data1},{status:"200"});

       
    } catch (error) {
        console.error("Error in POST /api/check-email:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}
