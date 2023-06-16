import {NextResponse} from "next/server";
import {withAuth} from "next-auth/middleware";

export default withAuth(function middleware(req) {
    const isNotAutorized = (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role === "admin");
    if (isNotAutorized) {
        NextResponse.next();
        return NextResponse.redirect(new URL("/", req.url));
    }
});

export const config = {
    matcher: [
        "/admin/:path*",
        "/podcasts/:path*",
    ],
};
