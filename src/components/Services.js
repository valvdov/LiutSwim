import React, { useState } from 'react';
import leftArrow from '../images/left arrow.png';
import rightArrow from '../images/right arrow.png';
import translations from "../data/translations";
import servicesData from "../data/dataServices";

function Services({ language }) {
    const t = translations[language] || translations["ru"];
    const cards = [
        {
            title: t.card_title_first,
            text: t.card_text_first,
            price: t.price_first,
        },
        {
            title: `${t.card_title__before} ${t.card_title_after}`,
            text: t.card_text,
            price: t.price,
        },
        {
            title: `${t.card_title_second__before} ${t.card_title_second_after}`,
            text: t.card_text_second,
            price: t.price_second,
        },
        {
            title: `афафафа`,
            text: 'dadadadasddwad',
            price: 15,
        },
        {
            title: `adwadasdawfwadfwafwaf`,
            text: 'fwfafsfawaffawf',
            price: 25,
        },
        {
            title: `liljl,hjkl8uhkk`,
            text: 'fwfhkufesf',
            price: 55,
        },
        // Добавьте остальные карточки
    ];

    const [startIndex, setStartIndex] = useState(0);
    const visibleCards = 3; // Количество отображаемых карточек

    const handleNext = () => {
        if (startIndex + visibleCards < cards.length) {
            setStartIndex(startIndex + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    const canGoPrev = startIndex > 0;
    const canGoNext = startIndex + visibleCards < cards.length;

    return (
        <div id="services" className="page-container">
            <div className="nav-bar">
                <button className="nav-button">
                    {language === 'ru' ? 'Услуги' : 'Services'}
                </button>
                <div className="next-buttons">
                    <button
                        className={`circle-button left-button ${
                            canGoPrev ? 'circle-button-active' : 'circle-button-inactive'
                        }`}
                        onClick={handlePrev}
                        disabled={!canGoPrev}
                    >
                        <img src={leftArrow} className="circle-button-arrow" alt="back" />
                    </button>
                    <button
                        className={`circle-button right-button ${
                            canGoNext ? 'circle-button-active' : 'circle-button-inactive'
                        }`}
                        onClick={handleNext}
                        disabled={!canGoNext}
                    >
                        <img src={rightArrow} className="circle-button-arrow" alt="forward" />
                    </button>
                </div>
            </div>
            <div className="card-container">
                {servicesData.slice(startIndex, startIndex + visibleCards).map((service, index) => (
                    <div
                        key={index}
                        className={`card ${
                            startIndex === 0 && index === 0 ? 'first-card-design' : ''
                        } ${index === 0 ? 'first-card' : ''}`}
                    >
                        <h2
                            className={`card-title ${
                                startIndex === 0 && index === 0 ? 'card-title-white' : ''
                            }`}
                        >{service.title[language]}</h2>
                        <p className="card-text">{service.text[language]}</p>
                        {!(startIndex === 0 && index === 0) && (
                            <div className="card-footer">
                                <span className="price">{service.price[language]}</span>
                                <button
                                    className="signup-button"
                                    onClick={() => {
                                        const registerElement = document.getElementById('register');
                                        if (registerElement) {
                                            registerElement.scrollIntoView({behavior: 'smooth'});
                                        }
                                    }}
                                >
                                    {t.signup_button}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;