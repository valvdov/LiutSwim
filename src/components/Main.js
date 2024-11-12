import React from 'react';
import Header from "./Header";
import translations from "../data/translations";

function Main({ language, setLanguage }) {
    const t = translations[language] || translations["ru"];

    return (
        <div className={'mainPage'}>
            <Header language={language} setLanguage={setLanguage} />
            <section className="Main">
                <div className="main_text">
                    <div className={`first_text ${language === "ru" ? "lang-ru" : "first_text__lang-en"}`}>
                        <span className="small_text">{t.small_text}</span>
                        <div className={`big_text big_text_first ${language === "ru" ? "lang-ru" : "big_text_first__lang-en"}`}>
                            {t.big_text_first}
                        </div>
                    </div>
                    <div className="second_text">
                        <div className="inline_text_container">
                            <span className="small_text small_text_second">{t.small_text_second}</span>
                            <div className="big_text big_text_second">{t.big_text_second}</div>
                        </div>
                        <div className={`level_and_button ${language === "ru" ? "lang-ru" : "level_and_button__lang-en"}`}>
                            <div className="big_text big_text_second level_text">{t.level_text}</div>
                            <div className="add_text">
                                <div className="subtext">{t.subtext}</div>
                                <button className="button">{t.button}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Main;