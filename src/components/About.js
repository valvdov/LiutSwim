// App.js или ваш компонент страницы
import React from 'react';
import '../blocks/about.css'; // Убедитесь, что у вас есть файл App.css в той же директории
import Tasks from '../images/tasks.png'
import Trainers from '../images/trainers.png'
import Enviroment from '../images/enviroment.png'
import Atmosphere from '../images/atmosphere.png'

function About() {
    return (
        <div className="container">
            <header className="about-text">
                <button className="about-button">О нас</button>
            </header>
            <main className="main-content">
                <h1 className="title">
                    <span className={'title_span'}>Мы используем метод обучения, построенный на индивидуальном подходе к каждому</span>  ученику, что ускоряет обучение, делая его комфортным и интересным.
                </h1>
                <div className="features">
                    <div className="feature-item">
                        <img src={Tasks} alt="Задания" className="feature-image"/>
                        <div className='feature-item-contnent'>
                            <h3 className="feature-title">Задания</h3>
                            <p className="feature-description">Задания учитывают возможные противопоказания и
                                разрабатываются с учетом различных потребностей у детей и взрослых.</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <img src={Enviroment} alt="Окружающая среда для ребенка" className="feature-image"/>
                        <div className='feature-item-contnent'>
                        <h3 className="feature-title">Окружающая среда для ребенка</h3>
                        <p className="feature-description">Мы создаем вдохновляющее и поддерживающее окружение для
                            ребенка, чтобы он смог достичь прогресса в своем темпе, наслаждаясь занятиями.</p>
                        </div>
                        </div>
                    <div className="feature-item">
                        <img src={Trainers} alt="Тренеры в воде" className="feature-image"/>
                        <div className='feature-item-contnent'>
                        <h3 className="feature-title">Тренеры в воде</h3>
                        <p className="feature-description">Все водные тренировки проходят с нахождением тренеров в
                            бассейне, что помогает ученику понять правильность упражнений.</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <img src={Atmosphere} alt="Атмосфера" className="feature-image"/>
                        <div className='feature-item-contnent'>
                        <h3 className="feature-title">Атмосфера</h3>
                        <p className="feature-description">Наша команда создает дружескую атмосферу для ребенка,
                            и следит за отношениями между детьми.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default About;
