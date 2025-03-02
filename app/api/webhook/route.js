import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";

/**
 * Webhook handler for LemonSqueezy events
 * Handles order_created, subscription_expired, and subscription_payment_failed events
 */
export async function POST(req) {
  try {
    // Get the raw request body
    const body = await req.text();
    
    // Verify webhook is coming from LemonSqueezy
    const hmac = crypto.createHmac("sha256", process.env.LS_SIGNING_SECRET);
    const digest = hmac.update(body).digest("hex");
    const signature = headers().get("x-signature");

    if (!signature || digest !== signature) {
      console.log("Invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse the request body
    const payload = JSON.parse(body);

    // Validate payload structure
    if (!payload?.meta?.event_name || !payload?.meta?.custom_data?.user_id) {
      console.log("Invalid payload structure");
      return NextResponse.json(
        { error: "Invalid payload structure" },
        { status: 400 }
      );
    }

    // Get the event name
    const eventName = payload.meta.event_name;
    const userId = payload.meta.custom_data.user_id;
    console.log(`Processing LemonSqueezy event: ${eventName} for user: ${userId}`);

    // Connect to MongoDB
    await connectMongo();

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      console.log(`User not found: ${userId}`);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Handle registered event types
    if (eventName === "order_created") {
      // Grant access to the product
      user.hasAccess = true;
      
      // Store customer ID if available
      if (payload.data?.attributes?.customer_id) {
        user.customerId = payload.data.attributes.customer_id;
      }
      
      await user.save();
      console.log(`Access granted to user: ${userId}`);
    } 
    else if (eventName === "subscription_expired" || eventName === "subscription_payment_failed") {
      // Revoke access
      user.hasAccess = false;
      await user.save();
      console.log(`Access revoked from user: ${userId} due to ${eventName}`);
    }
    else {
      // Log unregistered events but return success
      console.log(`Received unregistered LemonSqueezy event: ${eventName}`);
    }

    // Return success for all processed events
    return NextResponse.json(
      { success: true, event: eventName },
      { status: 200 }
    );

  } catch (error) {
    console.error("LemonSqueezy webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}