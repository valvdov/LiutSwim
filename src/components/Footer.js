import React from 'react';
import '../index.css';
import {Icon} from "@iconify/react";

function Footer() {
    return (
        <div className="footer">
            <div className="footer_container">
                <div>
                    <ul className='nav'>
                        <li>О Нас</li>
                        <li>Услуги</li>
                        <li>Программа Лояльности</li>
                        <li>FAQ</li>
                        <li>Контакты</li>
                    </ul>
                </div>
                <div>
                    <ul className='address_list'>
                        <li className='address'>Адрес</li>
                        <li>Primary School, Wessex Gardens, London NW11 9RR</li>
                        <li>658 Chiswick High Rd., Brentford TW8 0HJ</li>
                    </ul>
                    <ul className='contact_list'>
                        <li className='contact'>Телефон/E-mail</li>
                        <li>+44 7305 238189</li>
                        <li>+44 7423548200</li>
                        <li>liutswim@gmail.com</li>
                    </ul>
                </div>

                <div>
                    <ul className='work_hours'>
                        <p className='working_hours'>Часы работы</p>
                        <li>Wessex:</li>
                        <li>Суббота 11.00 - 12.00</li>
                        <li>Воскресенье 10.00 - 14.30</li>
                    </ul>
                    <ul className='work_hours_second'>
                        <li>Brentford:</li>
                        <li>Суббота 14.00 - 17.00</li>
                    </ul>
                </div>
                <div>
                    <div className='social_icons'>
                        <button className='social-icons-pack'>
                            <Icon className='social_icon' icon="uiw:facebook" color={'#014CCC'}/>
                        </button>
                        <button className='social-icons-pack'>
                            <Icon className='social_icon' icon="teenyicons:instagram-solid" color={'#014CCC'}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="footer_about">
                <p className='about_text'></p>
                <p className='about_text'>&copy;All rights reserved</p>
                <p className='about_text'>Cookies</p>
                <p className='about_text'>Terms&Privacy</p>
            </div>
        </div>
    );
}

export default Footer;