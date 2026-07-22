import React from 'react';
import translations from "../content/translations";
import {FacebookIcon, InstagramIcon} from './SocialIcons';

function Footer({language, locations, contacts}) {
    const t = translations[language] || translations["ru"];

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
                        {locations.map((loc) => (
                            <li key={loc.id}>{loc.address}</li>
                        ))}
                    </ul>
                    <ul className='contact_list'>
                        <li className='contact'>{t.phone_email}</li>
                        <li><a className='call_email' href={`tel:${contacts.phone}`}>{contacts.phone}</a></li>
                        <li><a className='call_email' href={`mailto:${contacts.email}`}>{contacts.email}</a></li>
                    </ul>
                </div>

                <div>
                    {locations.map((loc, i) => (
                        <ul className={i === 0 ? 'work_hours' : 'work_hours_second'} key={loc.id}>
                            {i === 0 && <p className='working_hours'>{t.working_hours}</p>}
                            <li>{loc.name}:</li>
                            {(loc.hours[language] || loc.hours.ru || []).map((h, j) => (
                                <li key={j}>{h}</li>
                            ))}
                        </ul>
                    ))}
                </div>
                <div>
                    <div className='social_icons'>
                        <a href={contacts.facebook} target="_blank" rel="noopener noreferrer"
                           className='social-icons-pack' aria-label="Facebook">
                            <FacebookIcon className='social_icon'/>
                        </a>
                        <a href={contacts.instagram} target="_blank" rel="noopener noreferrer"
                           className='social-icons-pack' aria-label="Instagram">
                            <InstagramIcon className='social_icon'/>
                        </a>
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
