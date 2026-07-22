'use client';

import React, {useState} from 'react';

function Faq({language, faqs}) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = index => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id="faq" className="faq-container">
            <button className="faq-button">FAQ</button>
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            {faq.question[language]}
                            <div className="faq-icon-wrapper">
                                <img
                                    alt={isOpen ? 'Minus Icon' : 'Plus Icon'}
                                    src={isOpen ? '/images/minus-sign.png' : '/images/plus-sign.png'}
                                    className="faq-icon"
                                />
                            </div>
                        </div>
                        {isOpen && <div className="faq-answer">{faq.answer[language]}</div>}
                    </div>
                );
            })}
        </div>
    );
}

export default Faq;
