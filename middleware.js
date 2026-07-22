import {NextResponse} from 'next/server';

// admin.liutswim.co.uk serves the admin panel at the root URL.
// (In Vercel: add admin.liutswim.co.uk as a domain of the same project.)
export function middleware(req) {
    const host = req.headers.get('host') || '';
    if (host.startsWith('admin.')) {
        const {pathname} = req.nextUrl;
        const passThrough =
            pathname.startsWith('/admin') ||
            pathname.startsWith('/api') ||
            pathname.startsWith('/_next') ||
            pathname.includes('.');
        if (!passThrough) {
            const url = req.nextUrl.clone();
            url.pathname = '/admin';
            return NextResponse.rewrite(url);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image).*)'],
};
