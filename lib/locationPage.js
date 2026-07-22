import {notFound} from 'next/navigation';
import defaultContent from '@/content/defaults';
import {getContent} from '@/lib/content';
import {SITE_URL} from '@/lib/seo';

// Shared logic for the /[location] and /ru/[location] routes.

export function locationStaticParams() {
    return defaultContent.locations.map((loc) => ({location: loc.id}));
}

export async function getLocation(id) {
    const content = await getContent();
    const location = content.locations.find((l) => l.id === id);
    if (!location) notFound();
    return {content, location};
}

export async function locationMetadata(id, lang) {
    const content = await getContent();
    const loc = content.locations.find((l) => l.id === id);
    if (!loc) return {};
    const area = loc.area || loc.name;

    const title = lang === 'ru'
        ? `Уроки плавания — ${area} | Liut Swim`
        : `Swimming Lessons in ${area} | Liut Swim`;
    const description = lang === 'ru'
        ? `Уроки плавания и синхронного плавания для детей и взрослых: ${loc.address}. Маленькие группы, тренеры Swim England/STA в воде. Запись онлайн.`
        : `Swimming and artistic swimming lessons for children and adults at ${loc.address}. Small groups, Swim England/STA coaches in the water. Book online.`;

    const path = lang === 'ru' ? `/ru/${loc.id}` : `/${loc.id}`;
    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        alternates: {
            canonical: path,
            languages: {
                en: `/${loc.id}`,
                ru: `/ru/${loc.id}`,
                'x-default': `/${loc.id}`,
            },
        },
        openGraph: {
            title,
            description,
            url: path,
            siteName: 'Liut Swim',
            images: [(loc.photos && loc.photos[0]) || '/preview.jpg'],
            locale: lang === 'ru' ? 'ru_RU' : 'en_GB',
            type: 'website',
        },
    };
}
