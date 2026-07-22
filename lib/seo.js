export const SITE_URL = 'https://liutswim.co.uk';

const meta = {
    en: {
        title: 'Liut Swim — Swimming School in London | Artistic & Synchronised Swimming',
        description:
            'Swimming and artistic (synchronised) swimming lessons in London for children and adults. Small groups, certified coaches in the water, 5 locations: Fulham, Hounslow, Wessex, Brentford, Kilburn.',
        keywords: [
            'swimming lessons London', 'artistic swimming', 'synchronised swimming',
            'swimming school London', 'kids swimming lessons', 'private swimming lessons London',
        ],
    },
    ru: {
        title: 'Liut Swim — школа плавания в Лондоне | Синхронное плавание',
        description:
            'Уроки плавания и синхронного плавания в Лондоне для детей и взрослых. Маленькие группы, сертифицированные тренеры в воде, 5 локаций: Fulham, Hounslow, Wessex, Brentford, Kilburn.',
        keywords: [
            'уроки плавания Лондон', 'синхронное плавание', 'школа плавания Лондон',
            'плавание для детей', 'artistic swimming', 'swimming lessons London',
        ],
    },
};

export function buildMetadata(lang) {
    const m = meta[lang];
    const path = lang === 'ru' ? '/ru' : '/';
    return {
        metadataBase: new URL(SITE_URL),
        title: m.title,
        description: m.description,
        keywords: m.keywords,
        authors: [{name: 'Liut Swim'}],
        alternates: {
            canonical: path,
            languages: {
                en: '/',
                ru: '/ru',
                'x-default': '/',
            },
        },
        openGraph: {
            title: m.title,
            description: m.description,
            url: path,
            siteName: 'Liut Swim',
            images: ['/preview.jpg'],
            locale: lang === 'ru' ? 'ru_RU' : 'en_GB',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: m.title,
            description: m.description,
            images: ['/preview.jpg'],
        },
        verification: {
            google: 'zodtS-28Xn7Gn-ghXGZ_DgwIeZhdu06Q7-66xSqCTXw',
        },
        icons: {
            icon: '/favicon.ico',
            apple: '/logo192.png',
        },
        manifest: '/manifest.json',
    };
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#000000',
};
