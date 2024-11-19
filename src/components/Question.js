import React, { useState } from 'react';
import Popup from './Popup';
import '../index.css';
import translations from "../data/translations";

function Question({ language }) {
    const t = translations[language] || translations["ru"];
    const [isPopupVisible, setPopupVisible] = useState(false);

    const openPopup = () => setPopupVisible(true);
    const closePopup = () => setPopupVisible(false);

    return (
        <div className="question">
            <h1 className="question_wrapper">
                <span className="question_text question_text_first">{t.question_text_first}</span>
                <span className="question_text question_text_second">{t.question_text_second}</span>
                <span className={`question_text question_text_third ${language === "ru" ? "" : "question_text_third__lang-en"}`}>{t.question_text_third}</span>
            </h1>
            <button className="question_button" onClick={openPopup}>
                {t.question_button}
            </button>
            <Popup isVisible={isPopupVisible} onClose={closePopup} language={language} t={t} />
        </div>
    );
}

export default Question;