import React from 'react';
import spanImg from '../images/loyalty_li.png'
import translations from "../data/translations";

function Loyalty({language}) {
    const t = translations[language] || translations["ru"];
    return (
        <div id="programm" className="loyalty-program-page">
                <button className="loyalty-program-button">{t.loyalty_program_button}</button>
                <h1 className="main-offer">{t.main_offer}</h1>
                <p className="description">
                    {t.description}
                </p>
                <div className="details">
                    <div className="discount-info">
                        <div className='discount-div'>
                            <span className="discount">50<sup>%</sup></span>
                            <p><img className='span_img' alt='li' src={spanImg}/>{t.discount_sup}</p>
                        </div>
                        <div className='duration-div'>
                            <span className="additional-discount">10<sup>%</sup></span>
                            <p><img className='span_img' alt='li' src={spanImg}/>{t.additional_discount}</p>
                        </div>
                        <div className='additional-discount-div'>
                            <span className="duration">6 <sub>{t.duration}</sub></span>
                            <p><img className='span_img' alt='li' src={spanImg}/>{t.duration_text}</p>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Loyalty;
