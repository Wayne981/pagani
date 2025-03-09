// API endpoint for creating a post by the user

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";

export async function POST(req) { 
  try {
    const body = await req.json(); // incoming request na parse madi , convert madutthe to json format
    const { title, description } = body; // extracts title and description from the body
 
    // it is like this 
// const title = body.title;
// const description = body.description;

// This is a common pattern in API endpoints for handling data submitted by users.


    // URL search Params
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    await connectMongo();

    const post = await Post.create({ // for creating the post
      title,
      description: description || "",
      boardId,
      userId: session?.user?.id,  // ? - if auth okay , or else undefined
    });

    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}