import { NextResponse } from 'next/server';

// Your allowed IPs
const ALLOWED_IPS = [
    "150.129.88.165" , // Use environment variable
];

export function middleware(req) {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Allow all access in development mode
    if (isDevelopment) {
        return NextResponse.next();
    }

    // Get all possible IP headers
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    // Try to get the real client IP from various headers
    const clientIp = 
        cfConnectingIp || 
        (forwarded ? forwarded.split(',')[0].trim() : null) ||
        realIp ||
        req.ip;

    console.log({
        timestamp: new Date().toISOString(),
        path: req.nextUrl.pathname,
        clientIp,
        allowedIps: ALLOWED_IPS,
        headers: {
            forwarded,
            realIp,
            cfConnectingIp
        }
    });

    if (!ALLOWED_IPS.includes(clientIp)) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: 'Access Denied for u Frog Navaneeth',
                clientIp // Including this for debugging
            }),
            {
                status: 403,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api/allow-access|_next/static|_next/image|favicon.ico).*)',
};