import React from 'react';
import logo from '../images/logo.png';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import {Icon} from "@iconify/react";

function Header({ language, setLanguage }) {
    function goFcb() {
        window.open("https://www.facebook.com/people/Liut-Swim/100075410320827/")
    }
    function goInst() {
        window.open("https://www.instagram.com/_liutswim_/")
    }

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
                        <button onClick={goFcb} className='social-icons-pack_header facebook'>
                            <Icon className='social_icon_header' icon="uiw:facebook" color={'#014CCC'}/>
                        </button>
                        <button onClick={goInst} className='social-icons-pack_header'>
                            <Icon className='social_icon_header' icon="teenyicons:instagram-solid" color={'#014CCC'}/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;