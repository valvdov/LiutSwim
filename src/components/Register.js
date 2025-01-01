import React from 'react';
import downArrow from '../images/down_arrow_lesson.png'
import translations from "../data/translations";

function Register({ language, selectedService, onServiceChange }) {
    const t = translations[language] || translations["ru"];

    return (
        <div id='register' className="discount-page">
            <div>
                <h1 className="discount-header">{t.discount_header} <br/> {t.discount_header_after}</h1>
                <h1 className='discount-header lesson'>{t.discount_header_lesson}<img className='arrow-down' src={downArrow} alt='arrow'/></h1>
            </div>
            <form className="discount-form">
                <input type="text" placeholder={t.discount_form__text} />
                <input type="tel" placeholder={t.discount_form__tel} />
                <input type="email" placeholder="Email" />
                <div className='selects-container'>
                    <label htmlFor="serevices-select">{t.serevices_select_label}</label>
                    <select className="discount-form-select" id="serevices-select"
                            value={selectedService} // Устанавливаем выбранное значение
                            onChange={(e) => onServiceChange(e.target.value)}>
                        <option value="sync">{t.serevices_select_sync}</option>
                        <option value="competetive">{t.serevices_select_competetive}</option>
                        <option value="private">{t.serevices_select_private}</option>
                        <option value="two-two-one">2:2:1</option>
                        <option value="one-two-one">1:2:1</option>
                    </select>
                </div>
                <div className='selects-container'>
                    <label htmlFor="place-select">{t.place_select_label}</label>
                    <select className="discount-form-select" id="place-select">
                        <option value="wessex">Wessex</option>
                        <option value="brentford">Brentford</option>
                        <option value="fulham">Fulham</option>
                    </select>
                </div>
                <label className="privacy-policy">
                    <input type="checkbox" />
                    {t.discount_checkbox} <a href="/privacy">{t.discount_checkbox_privacy}</a>
                </label>
                <button type="submit" className="submit-button">{t.discount_button}</button>
            </form>
        </div>
    );
}

export default Register;