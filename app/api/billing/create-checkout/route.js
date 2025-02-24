import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { lemonSqueezySetup, createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        if (!body.successUrl) {
            return NextResponse.json(
                { error: "Url is required" },
                { status: 400 }
            );
        }

        const session = await auth();

        await connectMongo();

        lemonSqueezySetup({
            apiKey: process.env.LS_API_KEY,
        });

        const user = await User.findById(session.user.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const checkoutLS = await createCheckout(
            process.env.LS_STORE_ID,
            process.env.LS_VARIANT_ID,
            {
                productOptions: {
                    redirectUrl: body.successUrl,
                },
                checkoutData: {
                    email: user.email,
                    custom: {
                        userId: user._id.toString(),
                    },
                },
            }
        );

        return NextResponse.json({ url: checkoutLS.data.data.attributes.url });

    } catch (e) {
        return NextResponse.json({ error: e?.message }, { status: 500 });
    }
}



// suc Url - this is what we need to checkout



// LS knows it is coming from us , as it has API key

// userId to string as it is the same





// finally we are going to give the url , where customers can put their credit cad
