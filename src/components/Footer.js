import React from 'react';
import '../index.css';
import {Icon} from "@iconify/react";
import translations from "../data/translations";

function Footer({language}) {
    const t = translations[language] || translations["ru"];
    function goFcb() {
        window.open("https://www.facebook.com/people/Liut-Swim/100075410320827/")
    }
    function goInst() {
        window.open("https://www.instagram.com/_liutswim_/")
    }

    return (
        <div className="footer" id='contacts'>
            <div className="footer_container">
                <div>
                    <ul className='nav'>
                        <li><a className='footer_menu_link' href="#about">{t.about}</a></li>
                        <li><a className='footer_menu_link' href="#services">{t.services}</a></li>
                        <li><a className='footer_menu_link' href="#programm">{t.program}</a></li>
                        <li><a className='footer_menu_link' href="#faq">{t.faq}</a></li>
                        <li><a className='footer_menu_link' href="#contacts">{t.contacts}</a></li>
                    </ul>
                </div>
                <div>
                    <ul className='address_list'>
                        <li className='address'>{t.address}</li>
                        <li>Normand Park, Lillie Rd, London SW6 7ST</li>
                        <li>Oaklands School, Gresham Road, Hounslow, TW3 4BX</li>
                        <li>Primary School, Wessex Gardens, London NW11 9RR</li>
                        <li>658 Chiswick High Rd., Brentford TW8 0HJ</li>
                    </ul>
                    <ul className='contact_list'>
                        <li className='contact'>{t.phone_email}</li>
                        <li><a className='call_email' href="tel:07399324217">07399324217</a></li>
                        <li><a className='call_email' href="mailto:liutswim@gmail.com">liutswim@gmail.com</a></li>
                    </ul>
                </div>

                <div>
                    <ul className='work_hours'>
                        <p className='working_hours'>{t.working_hours}</p>
                        <li>Fulham pools:</li>
                        <li>{t.working_hours_fullham}</li>
                    </ul>
                    <ul className='work_hours_second'>
                        <li>Hounslow:</li>
                        <li>{t.working_hours_hounslow}</li>
                    </ul>
                    <ul className='work_hours_second'>
                        <li>Wessex:</li>
                        <li>{t.working_hours_wessex_first}</li>
                        <li>{t.working_hours_wessex_second}</li>
                        <li>{t.working_hours_wessex_third}</li>
                    </ul>
                    <ul className='work_hours_second'>
                        <li>Brentford:</li>
                        <li>{t.working_hours_brentford}</li>
                    </ul>

                </div>
                <div>
                    <div className='social_icons'>
                        <button onClick={goFcb} className='social-icons-pack'>
                           <Icon className='social_icon' icon="uiw:facebook" color={'#014CCC'}/>
                        </button>
                        <button onClick={goInst} className='social-icons-pack'>
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