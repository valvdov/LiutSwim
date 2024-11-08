import React from 'react';
import '../blocks/advantages.css'; // Убедитесь, что подключен файл стилей
import logo from '../images/logo_adv.png'

function Advantages() {
    return (
        <div className="benefits-container">
            <button className="benefits-button">преимущества</button>
            <div className="benefits-content">
                <div className="benefits-main-text">
                    <h1>Мы поддерживаем <span>вдохновляющую и</span> <span>доброжелательную</span> атмосферу для вашего ребенка</h1>
                </div>
                <div className="benefits-list">
                    <ul>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>Время на восстановление</h2>
                                <p>Мы понимаем важность адаптации после травматичного опыта в воде и предоставляем время
                                    для
                                    восстановления</p>
                            </div>
                        </li>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>Соревнования</h2>
                                <p>Мы проводим соревнования, где дети сами выбирают образы и музыку.</p>
                            </div>
                        </li>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>Индивидуальный подход</h2>
                                <p>Мы поддерживаем инклюзивный подход и приветствуем детей, нуждающихся в индивидуальном
                                    подходе.</p>
                            </div>
                        </li>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>Ориентированы на результат</h2>
                                <p>Мы минимально используем нарукавники и дощечки для плавания.</p>
                            </div>
                        </li>
                        <li>
                            <img src={logo} alt='logo'/>
                            <div>
                                <h2>Множество счастливых студентов</h2>
                                <p>Обучили плаванию уже более 1800 учеников.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Advantages;
