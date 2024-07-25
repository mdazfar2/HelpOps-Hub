import Notifications from "@utils/models/notification";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Ensure Mongoose connection is established
const connectToDatabase = async () => {
  const { MONGO_URI } = process.env;
  if (!mongoose.connection.readyState) {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  }
};

export async function POST(req) {
  try {
    await connectToDatabase();
    const { userEmail, followerId, blogId, commentId ,blogName} = await req.json();

    // Find or create the notification document by userEmail
    let userNotification = await Notifications.findOne({ userEmail });
    
    if (!userNotification) {
      userNotification = new Notifications({
        userEmail,
        followerList: followerId ? { [followerId]: { dateTime: new Date() } } : {},
        blogList: blogId ? { [blogId]: { dateTime: new Date() } } : {},
        blogCommentList: commentId ? { [commentId]: { dateTime: new Date() ,blogId:blogId,blogName:blogName} } : {},

      });
    } else {
      if (followerId) {
        // Update the followerList if the document exists
        userNotification.followerList.set(followerId, { dateTime: new Date() });
      }
      if (blogId) {
        // Update the blogList if the document exists
        userNotification.blogList.set(blogId, { dateTime: new Date() });
      }
      if(commentId){
        userNotification.blogCommentList.set(commentId, { dateTime: new Date(),blogId:blogId,blogName:blogName });

      }
    }

    // Save the document
    await userNotification.save();
    return NextResponse.json({ message: "Notification updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating notification" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const userEmail = url.searchParams.get("userEmail");

    if (!userEmail) {
      return NextResponse.json({ message: "User email is required" }, { status: 400 });
    }

    // Find the notification document by userEmail
    const userNotification = await Notifications.findOne({ userEmail });

    if (!userNotification) {
      return NextResponse.json({ message: "No notifications found for this user" }, { status: 404 });
    }

    return NextResponse.json(userNotification, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching notifications" }, { status: 500 });
  }
}