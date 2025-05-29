import React from 'react';
import '../blocks/team.css'; // Убедитесь, что подключен файл стилей
import alexandraImage from '../images/Alexandra_new.jpg'; // Замените на пути к вашим изображениям
import annaImage from '../images/Anna_new.jpg';
import juliaImage from '../images/Julia_new.jpg';
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
                    <img src={alexandraImage} alt="Alexandra" className="member-image"/>
                    <div className="member-info">
                        <h3><span>{t.team_member_al}</span></h3>
                        <p>&#x2022; {t.team_info_certification}</p>
                        <p>&#x2022; {t.al_info_first}</p>
                        <p>&#x2022; {t.al_info_second}</p>
                        <p>&#x2022; {t.al_info_last}</p>
                    </div>
                </div>
                <div className="team-member">
                    <img src={annaImage} alt="Anna" className="member-image"/>
                    <div className="member-info">
                        <h3><span>{t.team_member_an}</span></h3>
                        <p>&#x2022; {t.team_info_certification}</p>
                        <p>&#x2022; {t.an_info_first}</p>
                        <p>&#x2022; {t.an_info_second}</p>
                        <p>&#x2022; {t.an_info_last}</p>
                    </div>
                </div>
                <div className="team-member">
                    <img src={juliaImage} alt="Julia" className="member-image"/>
                    <div className="member-info">
                        <h3><span>{t.team_member_ju}</span></h3>
                        <p>&#x2022; {t.team_info_certification}</p>
                        <p>&#x2022; {t.ju_info_first}</p>
                        <p>&#x2022; {t.ju_info_second}</p>
                        <p>&#x2022; {t.ju_info_last}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;
