import {SITE_URL} from '@/lib/seo';
import {getContent} from '@/lib/content';

export default async function sitemap() {
    const content = await getContent();
    const lastModified = new Date();

    const entry = (enPath, ruPath, priority) => ({
        url: `${SITE_URL}${enPath}`,
        lastModified,
        changeFrequency: 'weekly',
        priority,
        alternates: {
            languages: {en: `${SITE_URL}${enPath}`, ru: `${SITE_URL}${ruPath}`},
        },
    });

    const pages = [
        entry('/', '/ru', 1),
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

    for (const loc of content.locations) {
        pages.push(entry(`/${loc.id}`, `/ru/${loc.id}`, 0.8));
        pages.push({
            url: `${SITE_URL}/ru/${loc.id}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.7,
            alternates: {
                languages: {en: `${SITE_URL}/${loc.id}`, ru: `${SITE_URL}/ru/${loc.id}`},
            },
        });
    }

    return pages;
}
