import React from 'react';
import Image from 'next/image';
import translations from "../content/translations";

const FEATURES = [
    {img: '/images/tasks.jpg', w: 1400, h: 1050, title: 'feature_title_tasks', desc: 'feature_description_tasks', alt: {ru: 'Задания', en: 'Training tasks'}},
    {img: '/images/enviroment_new.jpg', w: 1008, h: 1400, title: 'feature_title_environment', desc: 'feature_description_environment', alt: {ru: 'Окружающая среда для ребенка', en: 'Environment for your child'}},
    {img: '/images/trainers.jpg', w: 1229, h: 1400, title: 'feature_title_coaches', desc: 'feature_description_coaches', alt: {ru: 'Тренеры в воде', en: 'Coaches in the pool'}},
    {img: '/images/atmosphere.jpg', w: 1400, h: 1005, title: 'feature_title_atmosphere', desc: 'feature_description_atmosphere', alt: {ru: 'Атмосфера', en: 'Atmosphere'}},
];

function About({language}) {
    const t = translations[language] || translations["ru"];

    return (
        <div id="about" className="container">
            <header className="about-text">
                <button
                    className={`about-button ${language === "ru" ? "lang-ru" : "about-button__lang-en"}`}>{t.about_button}</button>
            </header>
            <main className="main-content">
                <h1 className="title">
                    <span className={'title_span'}>{t.title_span__before}</span> {t.title_span__after}
                </h1>
                <div className="features">
                    {FEATURES.map((f) => (
                        <div className="feature-item" key={f.title}>
                            <Image src={f.img} width={f.w} height={f.h} alt={f.alt[language] || f.alt.ru}
                                   className="feature-image" sizes="(max-width: 660px) 90vw, 45vw"/>
                            <div className='feature-item-contnent'>
                                <h3 className="feature-title">{t[f.title]}</h3>
                                <p className="feature-description">{t[f.desc]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default About;
