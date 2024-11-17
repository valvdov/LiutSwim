import React from 'react';
import '../blocks/advantages.css'; // Убедитесь, что подключен файл стилей
import logo from '../images/logo_adv.png'
import translations from "../data/translations";

function Advantages({language}) {
    const t = translations[language] || translations["ru"];
    return (
        <div className="benefits-container">
            <button className="benefits-button">{t.benefits_button}</button>
            <div className="benefits-content">
                <div className="benefits-main-text">
                    <h1>{t.benefits_main_text} <span>{t.benefits_main_text_span}</span> <span>{t.benefits_main_text_span_second}</span> {t.benefits_main_text_end}</h1>
                </div>
                <div className="benefits-list">
                    <ul>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>{t.benefits_list_item}</h2>
                                <p>{t.benefits_list_item__text}</p>
                            </div>
                        </li>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>{t.benefits_list_item_second}</h2>
                                <p>{t.benefits_list_item_second__text}</p>
                            </div>
                        </li>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>{t.benefits_list_item_third}</h2>
                                <p>{t.benefits_list_item_third__text}</p>
                            </div>
                        </li>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>{t.benefits_list_item_fourth}</h2>
                                <p>{t.benefits_list_item_fourth__text}</p>
                            </div>
                        </li>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>{t.benefits_list_item_last}</h2>
                                <p>{t.benefits_list_item_last__text}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Advantages;
