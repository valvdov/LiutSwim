import React, { useState, useEffect } from 'react';
import leftArrow from '../images/left arrow.png';
import rightArrow from '../images/right arrow.png';
import translations from "../data/translations";
import servicesData from "../data/dataServices";

function Services({ language, onServiceSelect }) {
    const t = translations[language] || translations["ru"];

    const [startIndex, setStartIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3); // По умолчанию 3 карточки

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 660) {
                setVisibleCards(1);
            } else if (window.innerWidth < 976) {
                setVisibleCards(2);
            } else {
                setVisibleCards(3);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const triggerHapticFeedback = () => {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        } else {
            const button = document.createElement('input');
            button.type = 'button';
            button.style.position = 'absolute';
            button.style.opacity = '0';
            button.style.zIndex = '-1';
            document.body.appendChild(button);
            button.focus();
            button.click();
            document.body.removeChild(button);
        }
    };

    const handleNext = () => {
        if (startIndex + visibleCards < servicesData.length) {
            setStartIndex(startIndex + visibleCards);
            triggerHapticFeedback();
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - visibleCards);
            triggerHapticFeedback();
        }
    };

    const canGoPrev = startIndex > 0;
    const canGoNext = startIndex + visibleCards < servicesData.length;

    return (
        <div id="services" className="page-container">
            <div className="nav-bar">
                <button className="nav-button">
                    {language === "ru" ? "Услуги" : "Services"}
                </button>
                <div className="next-buttons">
                    <button
                        className={`circle-button left-button ${
                            canGoPrev ? "circle-button-active" : "circle-button-inactive"
                        }`}
                        onClick={handlePrev}
                        disabled={!canGoPrev}
                    >
                        <img src={leftArrow} className="circle-button-arrow" alt="back" />
                    </button>
                    <button
                        className={`circle-button right-button ${
                            canGoNext ? "circle-button-active" : "circle-button-inactive"
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
                    <div key={index} className={`card ${startIndex === 0 && index === 0 ? 'first-card-design' : ''}`}>
                        <h2
                            className={`card-title ${
                                startIndex === 0 && index === 0 ? 'card-title-white' : ''
                            }`}
                        >
                            {service.title[language]}
                        </h2>
                        <p
                            className={`card-text ${
                                startIndex === 0 && index === 0 ? 'card-text-white' : ''
                            }`}
                        >
                            {service.text[language]}
                        </p>
                        {!(startIndex === 0 && index === 0) && (
                            <div className="card-footer">
                                <span className="price">{service.price[language]}</span>
                                <button
                                    className="signup-button"
                                    onClick={() => {
                                        onServiceSelect(service.value);
                                        const registerElement = document.getElementById('register');
                                        if (registerElement) {
                                            registerElement.scrollIntoView({ behavior: 'smooth' });
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