import { connectionStr } from "@utils/db";
import NewsLetterSubscribe from "@utils/models/newslettersub";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = []
    try {
        await mongoose.connect(connectionStr);
        data = await NewsLetterSubscribe.find();
    } catch (error) {
        data = {success:false}
    }
  return NextResponse.json({ result: data });
}

export async function POST(req){
    const payload = await req.json();
    await mongoose.connect(connectionStr);
    let subscribe = new NewsLetterSubscribe(payload);
    const result = await subscribe.save();
    return NextResponse.json({ result,success:true});
}