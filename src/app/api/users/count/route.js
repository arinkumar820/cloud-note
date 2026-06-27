import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/model/User";

export async function GET(req) {
    try{

        await connectDB()
        const usersCount = await User.countDocuments()
        return NextResponse.json({
            success: true,
            usersCount,
        })
    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message,
        },
        {status:500})
    }
}