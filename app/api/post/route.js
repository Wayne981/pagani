// // API endpoint for creating a post by the user

// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import connectMongo from "@/libs/mongoose";
// import Post from "@/models/Post";
// import Filter from "bad-words";

// export async function POST(req) { 
//   try {
//     const body = await req.json(); // incoming request na parse madi , convert madutthe to json format
//     const { title, description } = body; // extracts title and description from the body
 
//     // it is like this 
// // const title = body.title;
// // const description = body.description;

// // This is a common pattern in API endpoints for handling data submitted by users.


//     // URL search Params
//     const { searchParams } = req.nextUrl;
//     const boardId = searchParams.get("boardId");

//     if (!title) {
//       return NextResponse.json(
//         { error: "Title is required" },
//         { status: 400 }
//       );
//     }

//     const badWordsFilter = new Filter();
//     const sanitizedTitle = badWordsFilter.clean(title);
//     const sanitizedDescription = badWordsFilter.clean(description);

//     const session = await auth();

//     await connectMongo();

//     const post = await Post.create({ // for creating the post 
//       title: sanitizedTitle,
//       description: sanitizedDescription,
//       boardId,
//       userId: session?.user?.id,  // ? - if auth okay , or else undefined
//     });

//     return NextResponse.json(post);
//   } catch (e) {
//     return NextResponse.json({ error: e.message }, { status: 500 });
//   }
// }


// API endpoint for creating a post by the user
// API endpoint for creating a post by the user

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";

// Simple function to filter profanity without using the external package
function sanitizeText(text) {
  if (!text) return "";
  
  // Simple list of words to filter - you can expand this
  const badWords = ['badword1', 'badword2', 'badword3'];
  
  let sanitized = text;
  badWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    sanitized = sanitized.replace(regex, '****');
  });
  
  return sanitized;
}

export async function POST(req) { 
  try {
    const body = await req.json();
    const { title, description } = body;

    // URL search Params
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Use our simple sanitizer function instead of bad-words package
    const sanitizedTitle = sanitizeText(title);
    const sanitizedDescription = sanitizeText(description);

    const session = await auth();

    await connectMongo();

    const post = await Post.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId: session?.user?.id,
    });

    return NextResponse.json(post);
  } catch (e) {
    console.error("Error creating post:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}