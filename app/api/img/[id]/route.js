const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

/**
 * Serves photos uploaded via the admin panel.
 *
 * Uploaded images are compressed in the browser and stored as base64 in
 * Firestore documents `images/{id}` (public read per security rules). This
 * route decodes one and returns it as a real image with immutable caching —
 * every upload gets a fresh id, so a URL never changes content.
 */
export async function GET(request, {params}) {
    const {id} = await params;
    if (!/^[\w-]{4,64}$/.test(id) || !PROJECT_ID) {
        return new Response('Not found', {status: 404});
    }

    const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/images/${id}`,
        {cache: 'force-cache'}
    );
    if (!res.ok) return new Response('Not found', {status: 404});

    const doc = await res.json();
    const dataUrl = doc?.fields?.data?.stringValue || '';
    const m = dataUrl.match(/^data:(image\/[\w.+-]+);base64,([\s\S]+)$/);
    if (!m) return new Response('Not found', {status: 404});

    return new Response(Buffer.from(m[2], 'base64'), {
        headers: {
            'Content-Type': m[1],
            'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
        },
    });
}
