import { NextResponse } from 'next/server';

// Array of allowed IPs - can include multiple addresses
const ALLOWED_IPS = [
    "150.129.88.165", // Replace with your actual IP
    // Add more IPs if needed
    // "ANOTHER_IP"
];

export function middleware(req) {
    // Get client IP from various headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = 
        forwardedFor ? forwardedFor.split(',')[0].trim() : 
        realIp ? realIp : 
        req.ip;

    // Debug logging
    console.log({
        timestamp: new Date().toISOString(),
        path: req.nextUrl.pathname,
        clientIp: clientIp,
        forwardedFor: forwardedFor,
        realIp: realIp
    });

    // Check if the IP is allowed
    if (!ALLOWED_IPS.includes(clientIp)) {
        console.log(`Access denied to IP: ${clientIp} for path: ${req.nextUrl.pathname}`);
        
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: 'Access Denied - IP not authorized'
            }), 
            {
                status: 403,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    console.log(`Access granted to IP: ${clientIp} for path: ${req.nextUrl.pathname}`);
    return NextResponse.next();
}

export const config = {
    matcher: '/:path*'  // Matches all paths
};





