import React, { useEffect } from 'react';
import '../index.css';

function Popup({ isVisible, onClose, language, t }) {
    // Блокируем прокрутку страницы при открытом popup
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup-container">
                <div className="popup-page">
                    <div>
                        <h1 className="discount-header lesson lesson-popup">
                            {t.popup_title}
                        </h1>
                    </div>
                    <form className="discount-form">
                        <input type="text" placeholder={t.discount_form__text} />
                        <input type="tel" placeholder={t.discount_form__tel} />
                        <input type="email" placeholder="Email" />
                        <textarea placeholder={t.discount_form_question} rows="4" />
                        <label className="privacy-policy">
                            <input type="checkbox" />
                            {t.discount_checkbox} <br /><a href="/privacy">{t.discount_checkbox_privacy}</a>
                        </label>
                        <button type="submit" className="submit-button">{t.discount_button}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Popup;