import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/model/Note";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get current user session
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    // Check if user is logged in
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // Read request body
    const body = await req.json();

    const title = body.title?.trim();
    const content = body.content?.trim();

    // Validate input
    if (!title || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and content are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Create note
    const note = await Note.create({
      title,
      content,
      userId: session.user.id,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        note,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Create Note Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get current user session
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    // Check authentication
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // Get only the logged-in user's notes
    const notes = await Note.find({
      userId: session.user.id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        count: notes.length,
        notes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Get Notes Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}