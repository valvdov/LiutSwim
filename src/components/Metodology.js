import React from 'react';
import '../blocks/metodology.css'
import swimmerImage from '../images/metodolog.png';
import translations from "../data/translations"; // Импортируйте ваше изображение

function Metodology({language}) {
    const t = translations[language] || translations["ru"];

    return (
        <div className="main-container">
            <div className='method-header'>
                <button className="method-button">{t.method_button}</button>
                <div className="text-block">
                    <p>{t.text_block}<span>{t.text_block_span_before}<br/>{t.text_block_span_after}</span>{t.text_block_after}</p>
                </div>
                <div></div>
            </div>
            <ul className="method-list">
                <li>(01) {t.method_list_01}</li>
                <li>(02) {t.method_list_02}</li>
                    <li>(03) {t.method_list_03}</li>
                    <li>(04) {t.method_list_04}</li>
                    <li>(05) {t.method_list_05}</li>
                </ul>
            <div className="right-column">
                <img src={swimmerImage} alt="Swimmer" className="swimmer-image"/>
            </div>
        </div>
    );
}

export default Metodology;
