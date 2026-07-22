import {revalidateTag, revalidatePath} from 'next/cache';
import {NextResponse} from 'next/server';

// Called by the admin panel after saving content: verifies the Firebase ID
// token, checks the email against ADMIN_EMAILS, then rebuilds the cached pages.
export async function POST(req) {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    let token;
    try {
        ({token} = await req.json());
    } catch {
        return NextResponse.json({error: 'Bad request'}, {status: 400});
    }
    if (!token || !apiKey) {
        return NextResponse.json({error: 'Unauthorised'}, {status: 401});
    }

    const lookup = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idToken: token}),
        }
    );
    if (!lookup.ok) {
        return NextResponse.json({error: 'Invalid token'}, {status: 401});
    }
    const data = await lookup.json();
    const email = data.users?.[0]?.email?.toLowerCase();
    const admins = (process.env.ADMIN_EMAILS || '')
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    if (!email || !admins.includes(email)) {
        return NextResponse.json({error: 'Forbidden'}, {status: 403});
    }

    revalidateTag('content');
    revalidatePath('/');
    revalidatePath('/ru');
    return NextResponse.json({revalidated: true});
}
