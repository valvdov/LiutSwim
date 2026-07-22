'use client';

import React, {useState, useEffect} from "react";
import emailjs from "@emailjs/browser";
import translations from "../content/translations";
import {useSelectedService} from './ServiceProvider';

function Register({language, services, locations, defaultPlace}) {
    const t = translations[language] || translations["ru"];
    const {selectedService, setSelectedService} = useSelectedService();

    const serviceOptions = services.filter((s) => s.value && s.value !== 'intro');

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: selectedService || (serviceOptions[0] && serviceOptions[0].value) || "",
        place: defaultPlace || (locations[0] && locations[0].id) || "",
    });
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (selectedService) {
            setFormData((prev) => ({...prev, service: selectedService}));
        }
    }, [selectedService]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleServiceChange = (value) => {
        setFormData({...formData, service: value});
        setSelectedService(value);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setSending(true);

        emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    service: formData.service,
                    place: formData.place,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            )
            .then(
                () => {
                    alert(t.form_sent);
                },
                (error) => {
                    console.error("Error sending email:", error);
                    alert(t.form_error);
                }
            )
            .finally(() => setSending(false));
    };

    return (
        <div id="register" className="discount-page">
            <div>
                <h1 className="discount-header">{t.discount_header} <br/> {t.discount_header_after}</h1>
                <h1 className="discount-header lesson">
                    {t.discount_header_lesson}
                    <img className="arrow-down" src="/images/down_arrow_lesson.png" alt="arrow"/>
                </h1>
            </div>
            <form className="discount-form" onSubmit={sendEmail}>
                <input
                    type="text"
                    name="name"
                    placeholder={t.discount_form__text}
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder={t.discount_form__tel}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className="selects-container">
                    <label htmlFor="serevices-select">{t.serevices_select_label}</label>
                    <select
                        className="discount-form-select"
                        id="serevices-select"
                        name="service"
                        value={formData.service}
                        onChange={(e) => handleServiceChange(e.target.value)}
                    >
                        {serviceOptions.map((s) => (
                            <option key={s.value} value={s.value}>{s.title[language] || s.title.ru}</option>
                        ))}
                    </select>
                </div>
                <div className="selects-container">
                    <label htmlFor="place-select">{t.place_select_label}</label>
                    <select
                        className="discount-form-select"
                        id="place-select"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                    >
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>{loc.name}</option>
                        ))}
                    </select>
                </div>
                <label className="privacy-policy">
                    <input type="checkbox" required/>
                    {t.discount_checkbox} <a href="/privacy">{t.discount_checkbox_privacy}</a>
                </label>
                <button type="submit" className="submit-button" disabled={sending}> {t.discount_button} </button>
            </form>
        </div>
    );
}

export default Register;
