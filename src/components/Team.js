import React from 'react';
import '../blocks/team.css'; // Убедитесь, что подключен файл стилей
import alexandraImage from '../images/Alexandra.jpg'; // Замените на пути к вашим изображениям
import annaImage from '../images/Anna.jpg';
import juliaImage from '../images/Julia.jpg';
import translations from "../data/translations";

function Team({language}) {
    const t = translations[language] || translations["ru"];
    return (
        <div className="team-container">
            <div className='team-header-container'>
                <button className="team-button">{t.team_button}</button>
                <h2 className="team-header">{t.team_header}<br/> {t.team_header_after}</h2>
                <div></div>
            </div>
            <div className="team-members">
                <div className="team-member">
                    <img src={alexandraImage} alt="Александра" className="member-image"/>
                    <div className="member-info">
                        <h3><span>{t.team_member_al}</span></h3>
                        <p>/ {t.al_info_first}</p>
                        <p>/ {t.al_info_second}</p>
                        <p>/ {t.al_info_last}</p>
                    </div>
                </div>
                <div className="team-member">
                    <img src={annaImage} alt="Анна" className="member-image"/>
                    <div className="member-info">
                        <h3><span>{t.team_member_an}</span></h3>
                        <p>/ {t.an_info_first}</p>
                        <p>/ {t.an_info_second}</p>
                        <p>/ {t.an_info_last}</p>
                    </div>
                </div>
                <div className="team-member">
                    <img src={juliaImage} alt="Юлия" className="member-image"/>
                    <div className="member-info">
                        <h3><span>{t.team_member_ju}</span></h3>
                        <p>/ {t.ju_info_first}</p>
                        <p>/ {t.ju_info_second}</p>
                        <p>/ {t.ju_info_last}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;
