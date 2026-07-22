import defaultContent from '@/content/defaults';

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

/**
 * Server-side content loader.
 *
 * Reads the admin-managed overrides from Firestore (document `site/content`,
 * stored as a single JSON string in the `json` field) via the public REST API —
 * no service account needed, the security rules allow public reads of this
 * document. Falls back to the defaults in `content/defaults.js` per section,
 * so the site works even before Firebase is configured.
 *
 * The fetch is tagged `content` and cached with ISR; the admin panel triggers
 * `/api/revalidate` after saving so changes appear within seconds.
 */
export async function getContent() {
    if (!PROJECT_ID) return withoutHidden(defaultContent);

    try {
        const res = await fetch(
            `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/site/content`,
            {next: {revalidate: 3600, tags: ['content']}}
        );
        if (!res.ok) return withoutHidden(defaultContent); // e.g. 404 — nothing saved yet
        const doc = await res.json();
        const json = doc?.fields?.json?.stringValue;
        if (!json) return withoutHidden(defaultContent);
        const saved = JSON.parse(json);
        // Section-level fallback: a section missing in Firestore uses defaults
        return withoutHidden({...defaultContent, ...saved});
    } catch (e) {
        console.error('getContent: falling back to defaults —', e.message);
        return withoutHidden(defaultContent);
    }
}

// Items can be hidden from the admin panel instead of deleted (e.g. a location
// that is temporarily closed). The public site never sees them; the admin
// reads Firestore directly and still does.
function withoutHidden(content) {
    const out = {...content};
    for (const key of ['services', 'team', 'locations', 'reviews', 'faqs']) {
        if (Array.isArray(out[key])) {
            out[key] = out[key].filter((item) => !item.hidden);
        }
    }
    return out;
}
