const sourceUrl = 'https://www.hounslow.gov.uk/schools-colleges/school-term-dates';

export default function TermCalendar({language}) {
    const ru = language === 'ru';

    return (
        <section className="term-calendar" aria-labelledby="term-calendar-title">
            <div className="term-calendar-card">
                <div className="term-calendar-file" aria-hidden="true">PDF</div>
                <div className="term-calendar-copy">
                    <h2 id="term-calendar-title">{ru ? 'Планируете занятия?' : 'Planning your lessons?'}</h2>
                    <p>{ru ? 'Школьные периоды и каникулы Hounslow' : 'Hounslow school terms and holidays'}</p>
                    <span className="term-calendar-meta">2026/27 · {ru ? 'Календарь в PDF · на русском' : 'PDF calendar · in English'}</span>
                </div>
                <a className="term-calendar-button" href={`/documents/hounslow-school-term-dates-2026-27${ru ? '-ru' : ''}.pdf`}
                   target="_blank" rel="noopener noreferrer">
                    {ru ? 'Открыть PDF' : 'Open PDF'} <span aria-hidden="true">↗</span>
                    <span className="term-calendar-sr">{ru ? ' (в новой вкладке)' : ' (opens in a new tab)'}</span>
                </a>
            </div>
            <p className="term-calendar-note">
                {ru ? 'Школьный календарь. Даты занятий уточняйте у LiutSwim.' : 'School calendar. Please confirm LiutSwim lesson dates with us.'}
                {' '}<a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                    {ru ? 'Источник: Hounslow Council' : 'Source: Hounslow Council'} <span aria-hidden="true">↗</span>
                </a>
            </p>
        </section>
    );
}
