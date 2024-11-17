import React from 'react';
import '../index.css';
import translations from "../data/translations";

function Question({language}) {
    const t = translations[language] || translations["ru"];
    return (
        <div className="question">
            <h1 className="question_wrapper">
                <span className="question_text question_text_first">{t.question_text_first}</span>
                <span className="question_text question_text_second">{t.question_text_second}</span>
                <span className={`question_text question_text_third ${language === "ru" ? "" : "question_text_third__lang-en"}`}>{t.question_text_third}</span>
            </h1>
            <button className="question_button">{t.question_button}</button>
        </div>
    );
}

export default Question;