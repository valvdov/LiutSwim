import React from 'react';
import Image from 'next/image';
import translations from "../content/translations";

function Team({language, team}) {
    const t = translations[language] || translations["ru"];
    return (
        <div className="team-container">
            <div className='team-header-container'>
                <button className="team-button">{t.team_button}</button>
                <h2 className="team-header">{t.team_header}<br/> {t.team_header_after}</h2>
                <div></div>
            </div>
            <div className="team-members">
                {team.map((member) => (
                    <div className="team-member" key={member.id}>
                        {member.image ? (
                            <Image src={member.image} width={857} height={1200}
                                   alt={member.name[language] || member.name.ru}
                                   className="member-image" sizes="(max-width: 660px) 90vw, 30vw"/>
                        ) : (
                            <div className="member-image member-image-placeholder" aria-hidden="true"/>
                        )}
                        <div className="member-info">
                            <h3><span>{member.name[language]}</span></h3>
                            {(member.bullets[language] || member.bullets.ru || []).map((line, i) => (
                                <p key={i}>&#x2022; {line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Team;
