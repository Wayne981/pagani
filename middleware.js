import { NextResponse } from 'next/server';

export function middleware(req) {
    const allowedIp = "150.129.88.165"; // Replace with your actual public IP address
    const forwardedFor = req.headers.get('x-forwarded-for'); // Get client IP from proxy
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : req.ip;

    console.log("Client IP:", clientIp); // Debugging log

    if (clientIp !== allowedIp) {
        console.log("Access denied to:", clientIp); // Debugging log
        return new NextResponse("Access Denied", { status: 403 });
    }

    console.log("Access granted to:", clientIp); // Debugging log
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*', // Applies to all routes
};




