import {NextResponse} from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/model/User";

export async function GET(req) {
    try{
        await connectDB()

    const users= await User.find()
    return NextResponse.json({
        success: true,
        users,
    })
    }catch(error){
        return NextResponse.json({
            success: false,
            message: error.message,
        },
       {status: 500})
    }
}


export async function POST(req) {
    try{
        await connectDB()
        const body =await Request.json()
        const user = await User.create(body)
        return NextResponse.json({
            success: true,
            user,
        })
    }catch(error){
        return NextResponse.json({
            success: false,
            message: error.message,
        },
       {status: 500})
    }  
} 
