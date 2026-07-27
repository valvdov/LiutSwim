import Header from './Header';
import LocationPhotos from './LocationPhotos';
import Register from './Register';
import Footer from './Footer';
import Question from './Question';
import {ServiceProvider} from './ServiceProvider';
import translations from '../content/translations';
import {SITE_URL} from '@/lib/seo';

// SEO landing page for one location: description, photos, opening times and
// the same booking form as the home page (location pre-selected).
export default function LocationPage({lang, content, location}) {
    const t = translations[lang] || translations.ru;
    const loc = location;

    const title = lang === 'ru'
        ? `Уроки плавания — ${loc.area || loc.name}`
        : `Swimming Lessons in ${loc.area || loc.name}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SportsActivityLocation',
        name: `Liut Swim — ${loc.name}`,
        url: `${SITE_URL}${lang === 'ru' ? '/ru' : ''}/${loc.id}`,
        telephone: content.contacts.phone,
        email: content.contacts.email,
        image: `${SITE_URL}${(loc.photos && loc.photos[0]) || '/preview.jpg'}`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: loc.address,
            addressLocality: 'London',
            addressCountry: 'GB',
        },
        parentOrganization: {'@type': 'Organization', name: 'Liut Swim', url: SITE_URL},
    };

    return (
        <ServiceProvider>
            <script type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <div className="location-hero">
                <Header language={lang} contacts={content.contacts}/>
                <div className="location-hero-text">
                    <h1 className="location-title">{title}</h1>
                    <p className="location-address">{loc.address}</p>
                </div>
            </div>

            <div className="location-body">
                <div className="location-info">
                    <p className="location-desc">{loc.description?.[lang] || loc.description?.en || ''}</p>
                    <div className="location-hours">
                        <h2>{t.working_hours}</h2>
                        <ul>
                            {(loc.hours[lang] || loc.hours.ru || []).map((h, i) => (
                                <li key={i}>{h}</li>
                            ))}
                        </ul>
                        <a className="location-services-link" href={lang === 'ru' ? '/ru#services' : '/#services'}>
                            {lang === 'ru' ? 'Все услуги и цены →' : 'All services and prices →'}
                        </a>
                    </div>
                </div>

                <LocationPhotos photos={loc.photos || []} name={loc.name} lang={lang}/>
            </div>

            <Register language={lang} services={content.services} locations={content.locations}
                      defaultPlace={loc.id}/>
            <Question language={lang}/>
            <Footer language={lang} locations={content.locations} contacts={content.contacts}/>
        </ServiceProvider>
    );
}
