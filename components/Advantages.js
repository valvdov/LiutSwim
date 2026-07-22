import React from 'react';
import translations from "../content/translations";

const ITEMS = [
    ['benefits_list_item', 'benefits_list_item__text'],
    ['benefits_list_item_second', 'benefits_list_item_second__text'],
    ['benefits_list_item_third', 'benefits_list_item_third__text'],
    ['benefits_list_item_fourth', 'benefits_list_item_fourth__text'],
    ['benefits_list_item_last', 'benefits_list_item_last__text'],
];

function Advantages({language}) {
    const t = translations[language] || translations["ru"];
    return (
        <div className="benefits-container">
            <button className="benefits-button">{t.benefits_button}</button>
            <div className="benefits-content">
                <div className={`benefits-main-text ${language === "ru" ? "" : "benefits-main-text__lang_en"}`}>
                    <h1>{t.benefits_main_text} <span>{t.benefits_main_text_span}</span>
                        <span>{t.benefits_main_text_span_second}</span> {t.benefits_main_text_end}</h1>
                </div>
                <div className="benefits-list">
                    <ul>
                        {ITEMS.map(([title, text]) => (
                            <li key={title}>
                                <img src="/images/logo_adv.png" alt='logo'/>
                                <div>
                                    <h2>{t[title]}</h2>
                                    <p>{t[text]}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Advantages;
