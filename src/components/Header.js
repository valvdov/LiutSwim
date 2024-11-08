import React from 'react';
import logo from '../images/logo.png';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';

function Header() {

    return (
        <header className="header">
            <div className={'header_container'}>
                <div className={'logo_img'}>LIUTSWIM</div>
                <div className={'header_menu'}>
                    <div className={'about'}>О нас</div>
                    <div className={'services'}>Услуги</div>
                    <div className={'program'}> Программа лояльности</div>
                    <div className={'faq'}>faq</div>
                    <div className={'contacts'}>Контакты</div>
                </div>
                <div className={'header_add'}>
                    <select className={'lang_select'}>
                        <option value="ru">RU</option>
                        <option value="en">EN</option>
                    </select>
                    <div className={'header_social'}>
                        <img className={'facebook'} src={facebook} alt={'Facebook'}/>
                        <img className={'instagram'} src={instagram} alt={'Instagram'}/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
