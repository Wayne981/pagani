import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
 
 
 // The following part of the code , will  be executed only if lemonsqueazy is making the request
 export async function POST(req) {
try {
    // Verify webook is coming from Lemonsqueezy
    const body = await req.text();

const hmac = crypto.createHmac("sha256", process.env.LS_SIGNING_SECRET);
const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
const signature = Buffer.from(headers().get("x-signature"), "utf8");

if (!crypto.timingSafeEqual(digest, signature)) {
  // invalid signature
  return NextResponse.json(
    { error : "Invalid signature"},
    {status : 400}
  );
}

 // parse takes a little text and turns it into js object
  // so payload will be js object - content sent by lemonsqueazy
const payload = JSON.parse(body);

 // event name - what the customer has done
const eventName = payload.meta.event_name;


if(eventName === "order_created") {
// give access to the product

await connectMongo();

 // for finding the user
const user = await User.findById(payload.meta.custom_data.user_id);

user.hasAccess = true;
user.customerId = payload.data.attributes.customer_id;

await user.save();


}

} catch(e) {
    console.log("Lemonsqueezy error:", e?.message); // no message , also no crashing of the function
}

return NextResponse.json({});



 }