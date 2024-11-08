import React from 'react';
import downArrow from '../images/down_arrow_lesson.png'

function Register() {
    return (
        <div className="discount-page">
            <div>
                <h1 className="discount-header">Получи скидку <br/> на первый</h1>
                <h1 className='discount-header lesson'>урок<img className='arrow-down' src={downArrow} alt='arrow'/></h1>
            </div>
            <form className="discount-form">
                <input type="text" placeholder="Имя"/>
                <input type="tel" placeholder="+7 (___) ___ __ __"/>
                <input type="email" placeholder="Email" />
                <label className="privacy-policy">
                    <input type="checkbox" />
                    Я согласен с обработкой персональных данных в соответствии с условиями <br/><a href="/privacy">политики конфиденциальности</a>
                </label>
                <button type="submit" className="submit-button">Отправить</button>
            </form>
        </div>
    );
}

export default Register;
