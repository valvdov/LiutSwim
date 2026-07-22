'use client';

import React, {useState} from 'react';
import {FacebookIcon, InstagramIcon, MenuIcon} from './SocialIcons';

function Header({language, contacts}) {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    // Language lives in the URL now (SEO): "/" is English, "/ru" is Russian.
    // Switching keeps the current page (e.g. /fulham <-> /ru/fulham).
    function changeLanguage(lang) {
        const path = window.location.pathname.replace(/^\/ru(\/|$)/, '/');
        window.location.href = lang === 'ru' ? ('/ru' + (path === '/' ? '' : path)) : path;
    }

    const base = language === 'ru' ? '/ru' : '/';
    const anchor = (id) => (base === '/' ? `/#${id}` : `${base}#${id}`);

    const langSelect = (
        <select
            className={'lang_select'}
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            aria-label="Language"
        >
            <option value="ru">RU</option>
            <option value="en">EN</option>
        </select>
    );

    const social = (cls) => (
        <>
            <a href={contacts.facebook} target="_blank" rel="noopener noreferrer"
               className={`social-icons-pack_header facebook ${cls || ''}`} aria-label="Facebook">
                <FacebookIcon className='social_icon_header'/>
            </a>
            <a href={contacts.instagram} target="_blank" rel="noopener noreferrer"
               className='social-icons-pack_header' aria-label="Instagram">
                <InstagramIcon className='social_icon_header'/>
            </a>
        </>
    );

    return (
        <section className="header">
            <div className={'header_container'}>
                <a className={'logo_img'} href={base}
                   style={{textDecoration: 'none', color: 'inherit'}}>LIUTSWIM</a>

                {/* Burger Button */}
                <button className="burger-button" onClick={toggleMenu} aria-label="Menu">
                    <MenuIcon/>
                </button>

                <div className={`header_menu ${menuOpen ? 'menu-open' : ''}`}>
                    <a href={anchor('about')} className={'header_menu_link'}>{language === "ru" ? "О нас" : "About"}</a>
                    <a href={anchor('services')} className={'header_menu_link'}>{language === "ru" ? "Услуги" : "Services"}</a>
                    <a href={anchor('programm')}
                       className={'header_menu_link'}>{language === "ru" ? "Программа лояльности" : "Loyalty Programme"}</a>
                    <a href={anchor('faq')} className={'header_menu_link'}>FAQ</a>
                    <a href={anchor('contacts')} className={'header_menu_link'}>{language === "ru" ? "Контакты" : "Contact"}</a>

                    <div className="menu-lang-social">
                        {langSelect}
                        <div className={'header_social'}>
                            {social()}
                        </div>
                    </div>
                </div>

                <div className={'header_add'}>
                    {langSelect}
                    <div className='header_social'>
                        {social()}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Header;
