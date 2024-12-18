import React, { useState } from 'react';
import { Icon } from "@iconify/react";

function Header({ language, setLanguage }) {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    function goFcb() {
        window.open("https://www.facebook.com/people/Liut-Swim/100075410320827/");
    }

    function goInst() {
        window.open("https://www.instagram.com/_liutswim_/");
    }

    return (
        <section className="header">
            <div className={'header_container'}>
                <div className={'logo_img'}>LIUTSWIM</div>

                {/* Burger Button */}
                <button className="burger-button" onClick={toggleMenu}>
                    <Icon icon="mdi:menu" color="#FFFFFF" width="30px" />
                </button>

                {/* Main Menu */}
                <div className={`header_menu ${menuOpen ? 'menu-open' : ''}`}>
                    <a href="#about" className={'header_menu_link'}>{language === "ru" ? "О нас" : "About"}</a>
                    <a href="#services" className={'header_menu_link'}>{language === "ru" ? "Услуги" : "Services"}</a>
                    <a href="#programm" className={'header_menu_link'}>{language === "ru" ? "Программа лояльности" : "Loyalty Programme"}</a>
                    <a href="#faq" className={'header_menu_link'}>{language === "ru" ? "FAQ" : "FAQ"}</a>
                    <a href="#contacts" className={'header_menu_link'}>{language === "ru" ? "Контакты" : "Contact"}</a>

                    {/* Language Selector */}
                    <div className="menu-lang-social">
                        <select
                            className={'lang_select'}
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="ru">RU</option>
                            <option value="en">EN</option>
                        </select>

                        {/* Social Icons */}
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

                {/* Default (Desktop) Social and Language */}
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