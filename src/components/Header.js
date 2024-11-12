import React from 'react';
import logo from '../images/logo.png';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';

function Header({ language, setLanguage }) {
    return (
        <section className="header">
            <div className={'header_container'}>
                <div className={'logo_img'}>LIUTSWIM</div>
                <div className={'header_menu'}>
                    <a href="#about" className={'header_menu_link'}>{language === "ru" ? "О нас" : "About"}</a>
                    <a href="#services" className={'header_menu_link'}>{language === "ru" ? "Услуги" : "Services"}</a>
                    <a href="#programm" className={'header_menu_link'}>{language === "ru" ? "Программа лояльности" : "Loyalty Programme"}</a>
                    <a href="#faq" className={'header_menu_link'}>{language === "ru" ? "faq" : "FAQ"}</a>
                    <a href="#contacts" className={'header_menu_link'}>{language === "ru" ? "Контакты" : "Contact"}</a>
                </div>
                <div className={'header_add'}>
                    <select
                        className={'lang_select'}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="ru">RU</option>
                        <option value="en">EN</option>
                    </select>
                    <div className={'header_social'}>
                        <img className={'facebook'} src={facebook} alt={'Facebook'} />
                        <img className={'instagram'} src={instagram} alt={'Instagram'} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;