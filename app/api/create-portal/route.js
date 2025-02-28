import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { lemonSqueezySetup, getCustomer } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectMongo();
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    lemonSqueezySetup({
      apiKey: process.env.LS_API_KEY,
    });

    const customer = await getCustomer(user.customerId);
    
    return NextResponse.json({
      url: customer.data.data.attributes.urls.customer_portal,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}