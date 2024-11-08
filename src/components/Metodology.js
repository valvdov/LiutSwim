import React from 'react';
import '../blocks/metodology.css'
import swimmerImage from '../images/metodolog.png'; // Импортируйте ваше изображение

function Metodology() {
    return (
        <div className="main-container">
            <div className='method-header'>
                <button className="method-button">методология</button>
                <div className="text-block">
                    <p>Наша методика была разработана <span> на основе <br/>богатого опыта </span> наших тренеров.</p>
                </div>
                <div></div>
            </div>
            <ul className="method-list">
                <li>(01) Во время занятий тренеры находятся в воде, что ускоряет процесс освоения</li>
                <li>(02) Программа учитывает психологические и физические возможности ребенка и корректируется при
                        необходимости
                    </li>
                    <li>(03) В конце занятий тренеры проводят развлекательные активности, чтобы дети смогли
                        расслабиться
                    </li>
                    <li>(04) Повышение выносливости за счет развития дыхательной системы</li>
                    <li>(05) Контроль успеваемости с помощью личных дневников</li>
                </ul>
            <div className="right-column">
                <img src={swimmerImage} alt="Swimmer" className="swimmer-image"/>
            </div>
        </div>
    );
}

export default Metodology;
