import {SITE_URL} from '@/lib/seo';

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            // /api/img serves photos uploaded via the admin — keep them indexable
            allow: ['/', '/api/img/'],
            disallow: ['/admin', '/api/'],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
