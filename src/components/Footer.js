import React from 'react';
import '../index.css';

function Footer() {
    return (
        <div className="footer">
            <div>
                <ul>
                    <li>О Нас</li>
                    <li>Услуги</li>
                    <li>Программа Лояльности</li>
                    <li>FAQ</li>
                    <li>Контакты</li>
                </ul>
            </div>
            <div>
                <p>Адрес</p>
                <p>Primary School, Wessex Gardens, London NW11 9RR</p>
                <p>658 Chiswick High Rd., Brentford TW8 0HJ</p>
                <p>Телефон/E-mail</p>
                <p>+44 7305 238189</p>
                <p>+44 7423548200</p>
                <p>liutswim@gmail.com</p>
            </div>
            <div>
                <p>Часы работы</p>
                <p>Wessex:</p>
                <p>Суббота 11.00 - 12.00</p>
                <p>Воскресенье 10.00 - 14.30</p>
                <p>Brentford:</p>
                <p>Суббота 14.00 - 17.00</p>
            </div>
            <div>
                <button>Terms&Privacy</button>
            </div>
        </div>
    );
}

export default Footer;