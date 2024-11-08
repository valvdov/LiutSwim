import React from 'react';
import '../blocks/services.css'
import leftArrow from '../images/left arrow.png'
import rightArrow from '../images/right arrow.png'

function Services() {
    return (
        <div className="page-container">
            <div className="nav-bar">
                <button className="nav-button">наши программы</button>
                <div className="next-buttons">
                    <button className="circle-button left-button"><img src={leftArrow} className={'circle-button-arrow'}
                                                                       alt='back'/></button>
                    <button className="circle-button right-button"><img src={rightArrow}
                                                                        className={'circle-button-arrow'}
                                                                        alt='forward'/></button>
                </div>
            </div>
            <div className="card-container">
                <div className="card">
                    <h2 className="card-title-first">В Liutswim программа тренировок представляет собой ряд комплексных
                        и
                        динамичных упражнений, направленных на развитие мускулатуры и выносливости
                    </h2>
                </div>
                <div className="card">
                <h2 className="card-title">Синхронное<br/> плавание</h2>
                    <p className="card-text">Вид спорта, в котором пловцы синхронно исполняют хореографические элементы
                        под музыкальное сопровождение.</p>
                    <div className="card-footer">
                        <span className="price">32£ - за 90 минут</span>
                        <button className="signup-button">Записаться</button>
                    </div>
                </div>
                <div className="card">
                    <h2 className="card-title">Спортивное плавание</h2>
                    <p className="card-text">Вид спорта, в котором пловцы совершают заплыв на определенную дистанцию
                        за наименьшее время, используя определенный стиль</p>
                    <div className="card-footer">
                        <span className="price">18£ - за 45 минут</span>
                        <button className="signup-button">Записаться</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
