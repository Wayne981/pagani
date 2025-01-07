import { NextResponse } from 'next/server';

export function middleware(req) {
    const allowedIp = "150.129.88.165"; // Replace with your IP address
    const clientIp = req.headers.get('x-forwarded-for') || req.ip;

    if (clientIp !== allowedIp) {
        return new NextResponse("Access Denied", { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*', // Match all routes
};
