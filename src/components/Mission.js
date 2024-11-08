import React from 'react';
import '../blocks/mission.css'; // Убедитесь, что подключен файл стилей
import downArrow from '../images/down_arrow.png'

function Mission() {
    return (
        <div className="mission-page">
            <button className="mission-button">миссия</button>
            <div className="mission-statement">
                <h1 className="main-text">ДВИЖИМЫЕ</h1>
                <h1 className="main-text main-text_low">СТРАСТЬЮ</h1>
                <div className='overlay-cont'>
                    <img className='overlay-img' src={downArrow} alt={"down_arrow"}/>
                    <h2 className="overlay-text">объединенные<br/> опытом,</h2>
                </div>
            </div>
        </div>
    );
}

export default Mission;
