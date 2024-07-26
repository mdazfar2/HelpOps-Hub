import Notifications from "@utils/models/notification"; // Correct model import
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server"; // Importing Next.js server response utility

// Ensure Mongoose connection is established
const connectToDatabase = async () => {
  const { MONGO_URI } = process.env;
  if (!mongoose.connection.readyState) {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  }
};

export async function POST(req) {
  await connectToDatabase();
  try {
    const { userEmail, type, id } = await req.json();

    const userNotification = await Notifications.findOne({ userEmail });
    if (!userNotification) {
      return NextResponse.json({ message: "No notifications found for this user" }, { status: 404 });
    }

    if (type === "follower" && userNotification.followerList.has(id)) {
      userNotification.followerList.get(id).isRead = true;
    } else if (type === "blog" && userNotification.blogList.has(id)) {
      userNotification.blogList.get(id).isRead = true;
    }else if(type=="comments" && userNotification.blogCommentList.has(id)){
      userNotification.blogCommentList.get(id).isRead = true;
    } else {
      return NextResponse.json({ message: "Notification not found" }, { status: 404 });
    }

    await userNotification.save();
    return NextResponse.json({ message: "Notification status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating notification status" }, { status: 500 });
  }
}

export async function handler(req) {
  if (req.method === 'POST') {
    return await POST(req);
  } else {
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
  }
}
