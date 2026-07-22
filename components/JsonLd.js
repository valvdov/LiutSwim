// Structured data for search engines: local business info + FAQ rich results.
const SITE_URL = 'https://liutswim.co.uk';

export default function JsonLd({lang, content}) {
    const {locations, contacts, faqs, services} = content;

    const business = {
        '@context': 'https://schema.org',
        '@type': 'SportsActivityLocation',
        name: 'Liut Swim',
        description: lang === 'ru'
            ? 'Школа плавания и синхронного плавания в Лондоне для детей и взрослых'
            : 'Swimming and artistic swimming school in London for children and adults',
        url: SITE_URL,
        telephone: contacts.phone,
        email: contacts.email,
        image: `${SITE_URL}/preview.jpg`,
        sameAs: [contacts.facebook, contacts.instagram].filter(Boolean),
        address: locations.map((loc) => ({
            '@type': 'PostalAddress',
            streetAddress: loc.address,
            addressLocality: 'London',
            addressCountry: 'GB',
        })),
        makesOffer: services
            .filter((s) => s.price && (s.price[lang] || s.price.en))
            .map((s) => ({
                '@type': 'Offer',
                name: s.title[lang] || s.title.en,
                description: (s.price[lang] || s.price.en || '').replace(/\n/g, ', '),
            })),
    };

    const faqPage = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question[lang] || f.question.en,
            acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer[lang] || f.answer.en,
            },
        })),
    };

    return (
        <>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(business)}}/>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(faqPage)}}/>
        </>
    );
}
