import {SITE_URL} from '@/lib/seo';

export default function sitemap() {
    const lastModified = new Date();
    return [
        {
            url: `${SITE_URL}/`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1,
            alternates: {
                languages: {en: `${SITE_URL}/`, ru: `${SITE_URL}/ru`},
            },
        },
        {
            url: `${SITE_URL}/ru`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
            alternates: {
                languages: {en: `${SITE_URL}/`, ru: `${SITE_URL}/ru`},
            },
        },
    ];
}
