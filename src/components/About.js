// App.js или ваш компонент страницы
import React, {useState} from 'react';
import '../blocks/about.css'; // Убедитесь, что у вас есть файл App.css в той же директории
import Tasks from '../images/tasks.png'
import Trainers from '../images/trainers.png'
import Enviroment from '../images/enviroment.png'
import Atmosphere from '../images/atmosphere.png'

import translations from "../data/translations";

function About({language}) {

    const t = translations[language] || translations["ru"]; // Fallback to Russian if undefined

    return (
        <div id="about" className="container">
            <header className="about-text">
                <button className={`about-button ${language === "ru" ? "lang-ru" : "about-button__lang-en"}`}>{t.about_button}</button>
            </header>
            <main className="main-content">
                <h1 className="title">
                    <span className={'title_span'}>{t.title_span__before}</span>  {t.title_span__after}
                </h1>
                <div className="features">
                    <div className="feature-item">
                        <img src={Tasks} alt="Задания" className="feature-image"/>
                        <div className='feature-item-contnent'>
                            <h3 className="feature-title">{t.feature_title_tasks}</h3>
                            <p className="feature-description">{t.feature_description_tasks}</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <img src={Enviroment} alt="Окружающая среда для ребенка" className="feature-image"/>
                        <div className='feature-item-contnent'>
                        <h3 className="feature-title">{t.feature_title_environment}</h3>
                        <p className="feature-description">{t.feature_description_environment}</p>
                        </div>
                        </div>
                    <div className="feature-item">
                        <img src={Trainers} alt="Тренеры в воде" className="feature-image"/>
                        <div className='feature-item-contnent'>
                        <h3 className="feature-title">{t.feature_title_coaches}</h3>
                        <p className="feature-description">{t.feature_description_coaches}</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <img src={Atmosphere} alt="Атмосфера" className="feature-image"/>
                        <div className='feature-item-contnent'>
                        <h3 className="feature-title">{t.feature_title_atmosphere}</h3>
                        <p className="feature-description">{t.feature_description_atmosphere}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default About;
