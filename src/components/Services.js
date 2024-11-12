import React from 'react';
import '../blocks/services.css'
import leftArrow from '../images/left arrow.png'
import rightArrow from '../images/right arrow.png'
import translations from "../data/translations";

function Services({language}) {
    const t = translations[language] || translations["ru"];

    return (
        <div id="services" className="page-container">
            <div className="nav-bar">
                <button className="nav-button">{t.nav_button}</button>
                <div className="next-buttons">
                    <button className="circle-button left-button"><img src={leftArrow} className={'circle-button-arrow'}
                                                                       alt='back'/></button>
                    <button className="circle-button right-button"><img src={rightArrow}
                                                                        className={'circle-button-arrow'}
                                                                        alt='forward'/></button>
                </div>
            </div>
            <div className="card-container">
                <div className="card">
                    <h2 className={`card-title-first ${language === "ru" ? "lang-ru" : "card-title-first__lang-en"}`}>{t.card_title_first}
                    </h2>
                </div>
                <div className="card">
                <h2 className="card-title">{t.card_title__before}<br/> {t.card_title_after}</h2>
                    <p className="card-text">{t.card_text}</p>
                    <div className="card-footer">
                        <span className="price">{t.price}</span>
                        <button className="signup-button">{t.signup_button}</button>
                    </div>
                </div>
                <div className="card">
                    <h2 className="card-title">{t.card_title_second__before}<br /> {t.card_title_second_after}</h2>
                    <p className="card-text">{t.card_text_second}</p>
                    <div className="card-footer">
                        <span className="price">{t.price_second}</span>
                        <button className="signup-button">{t.signup_button}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
