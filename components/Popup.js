'use client';

import React, {useEffect, useState} from 'react';
import emailjs from '@emailjs/browser';

function Popup({isVisible, onClose, language, t}) {
    const [form, setForm] = useState({name: '', phone: '', email: '', question: ''});
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    name: form.name,
                    phone: form.phone,
                    email: form.email,
                    service: `Вопрос: ${form.question}`,
                    place: '-',
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    alert(t.form_sent);
                    onClose();
                },
                () => alert(t.form_error)
            )
            .finally(() => setSending(false));
    };

    return (
        <div className="popup-overlay" onClick={handleOverlayClick}>
            <div className="popup-container">
                <div className="popup-page">
                    <h1 className="popup-header lesson-popup">
                        {t.popup_title}
                    </h1>
                    <form className="popup-form" onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder={t.discount_form__text} value={form.name}
                               onChange={handleChange} required/>
                        <input type="tel" name="phone" placeholder={t.discount_form__tel} value={form.phone}
                               onChange={handleChange}/>
                        <input type="email" name="email" placeholder="Email" value={form.email}
                               onChange={handleChange} required/>
                        <textarea name="question" placeholder={t.discount_form_question} value={form.question}
                                  onChange={handleChange} required/>
                        <label className="privacy-policy">
                            <input type="checkbox" required/>
                            {t.discount_checkbox} <br/><a href="/privacy">{t.discount_checkbox_privacy}</a>
                        </label>
                        <button type="submit" className="submit-popup-button"
                                disabled={sending}>{t.discount_button}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Popup;
