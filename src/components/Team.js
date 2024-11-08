import React from 'react';
import '../blocks/team.css'; // Убедитесь, что подключен файл стилей
import alexandraImage from '../images/Alexandra.jpg'; // Замените на пути к вашим изображениям
import annaImage from '../images/Anna.jpg';
import juliaImage from '../images/Julia.jpg';

function Team() {
    return (
        <div className="team-container">
            <div className='team-header-container'>
                <button className="team-button">команда</button>
                <h2 className="team-header">Встречайте нашу команду<br/> высококвалифицированных специалистов!</h2>
                <div></div>
            </div>
            <div className="team-members">
                <div className="team-member">
                    <img src={alexandraImage} alt="Александра" className="member-image"/>
                    <div className="member-info">
                        <h3><span>Александра</span></h3>
                        <p>/ мастер спорта по синхронному плаванию</p>
                        <p>/ занимается профессиональным спортом более 10 лет</p>
                        <p>/ более 6 лет преподавала синхронное плавание детям в Школе Олимпийского Резерва</p>
                    </div>
                </div>
                <div className="team-member">
                    <img src={annaImage} alt="Анна" className="member-image"/>
                    <div className="member-info">
                        <h3><span>Анна</span></h3>
                        <p>/ работает с детьми уже более 6 лет</p>
                        <p>/ прошла курсы по оказанию первой помощи, безопасности на воде, тренерской работе и питанию в Великобритании </p>
                        <p>/ проводила реабилитационные программы для детей и взрослых с нарушениями осанки</p>
                    </div>
                </div>
                <div className="team-member">
                    <img src={juliaImage} alt="Юлия" className="member-image"/>
                    <div className="member-info">
                        <h3><span>Юлия</span></h3>
                        <p>/ работает с детьми уже более 20 лет</p>
                        <p>/ прошла курсы по оказанию первой помощи, безопасности на воде, тренерской работе и питанию в Великобритании.</p>
                        <p>/ проводила реабилитационные программы для детей и взрослых с нарушениями осанки</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;
