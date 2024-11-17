import React from 'react';
import '../blocks/mission.css'; // Убедитесь, что подключен файл стилей
import downArrow from '../images/down_arrow.png'
import translations from "../data/translations";

function Mission({language}) {
    const t = translations[language] || translations["ru"];
    return (
        <div className="mission-page">
            <button className="mission-button">{t.mission_button}</button>
            <div className="mission-statement">
                <h1 className='main-text'>{t.main_text}</h1>
                <h1 className={`main-text main-text_low ${language === "ru" ? "" : "main-text_low__lang-en"}`}>{t.main_text_low}</h1>
                <div className={`overlay-cont ${language === "ru" ? "lang-ru" : "overlay-cont__lang_en"}`}>
                    <img className='overlay-img' src={downArrow} alt={"down_arrow"}/>
                    <h2 className={`overlay-text ${language === "ru" ? "" : "overlay-text__lang-en"}`}>{t.overlay_text}<br/> {t.overlay_text_after}</h2>
                </div>
            </div>
        </div>
    );
}

export default Mission;
