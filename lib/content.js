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
    if (!PROJECT_ID) return defaultContent;

    try {
        const res = await fetch(
            `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/site/content`,
            {next: {revalidate: 3600, tags: ['content']}}
        );
        if (!res.ok) return defaultContent; // e.g. 404 — nothing saved yet
        const doc = await res.json();
        const json = doc?.fields?.json?.stringValue;
        if (!json) return defaultContent;
        const saved = JSON.parse(json);
        // Section-level fallback: a section missing in Firestore uses defaults
        return {...defaultContent, ...saved};
    } catch (e) {
        console.error('getContent: falling back to defaults —', e.message);
        return defaultContent;
    }
}
