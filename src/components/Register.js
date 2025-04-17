import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser"; // Импортируем EmailJS
import downArrow from "../images/down_arrow_lesson.png";
import translations from "../data/translations";

function Register({ language, selectedService, onServiceChange }) {
    const t = translations[language] || translations["ru"];

    // Локальные стейты для полей формы
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: selectedService, // Используем выбранный сервис
        place: "wessex",
    });

    // Обновление formData, если selectedService изменился
    useEffect(() => {
        setFormData((prev) => ({ ...prev, service: selectedService }));
    }, [selectedService]);

    // Обновление стейта при вводе данных
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Обновление выбранного сервиса
    const handleServiceChange = (value) => {
        setFormData({ ...formData, service: value });
        onServiceChange(value); // Вызываем колбэк
    };

    // Функция отправки формы
    const sendEmail = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        emailjs
            .send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID, // ID сервиса
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // ID шаблона
                {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    service: formData.service,
                    place: formData.place,
                },
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            )
            .then(
                (response) => {
                    console.log("Email sent successfully:", response);
                    alert("Ваша заявка отправлена!");
                },
                (error) => {
                    console.error("Error sending email:", error);
                    alert("Ошибка при отправке заявки, попробуйте снова.");
                }
            );
    };

    return (
        <div id="register" className="discount-page">
            <div>
                <h1 className="discount-header">{t.discount_header} <br/> {t.discount_header_after}</h1>
                <h1 className="discount-header lesson">
                    {t.discount_header_lesson}
                    <img className="arrow-down" src={downArrow} alt="arrow"/>
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
                        <option value="sync">{t.serevices_select_sync}</option>
                        <option value="competetive">{t.serevices_select_competetive}</option>
                        <option value="private">{t.serevices_select_private}</option>
                        <option value="two-two-one">2:2:1</option>
                        <option value="one-two-one">1:2:1</option>
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
                        <option value="wessex">Wessex</option>
                        <option value="brentford">Brentford</option>
                        <option value="fulham">Fulham</option>
                    </select>
                </div>
                <label className="privacy-policy">
                    <input type="checkbox" required />
                    {t.discount_checkbox} <a href="/privacy">{t.discount_checkbox_privacy}</a>
                </label>
                <button type="submit" className="submit-button"> {t.discount_button} </button>
            </form>
        </div>
    );
}

export default Register;