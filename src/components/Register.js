import React from 'react';
import downArrow from '../images/down_arrow_lesson.png'
import translations from "../data/translations";

function Register({language}) {
    const t = translations[language] || translations["ru"];
    return (
        <div className="discount-page">
            <div>
                <h1 className="discount-header">{t.discount_header} <br/> {t.discount_header_after}</h1>
                <h1 className='discount-header lesson'>{t.discount_header_lesson}<img className='arrow-down' src={downArrow} alt='arrow'/></h1>
            </div>
            <form className="discount-form">
                <input type="text" placeholder={t.discount_form__text}/>
                <input type="tel" placeholder={t.discount_form__tel}/>
                <input type="email" placeholder="Email" />
                <label className="privacy-policy">
                    <input type="checkbox" />
                    {t.discount_checkbox} <br/><a href="/privacy">{t.discount_checkbox_privacy}</a>
                </label>
                <button type="submit" className="submit-button">{t.discount_button}</button>
            </form>
        </div>
    );
}

export default Register;
