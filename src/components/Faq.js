import React, { useState } from 'react';
import faqsData from "../data/dataFaq";
import plusSymbol from "../images/plus-sign.png";
import minusSymbol from "../images/minus-sign.png";

function Faq({ language }) {
    const [faqs, setFaqs] = useState(faqsData.map(faq => ({ ...faq, isOpen: false })));

    const toggleFAQ = index => {
        setFaqs(faqs.map((faq, i) => {
            if (i === index) {
                return { ...faq, isOpen: !faq.isOpen };
            }
            return faq;
        }));
    };

    return (
        <div id="faq" className="faq-container">
            <button className="faq-button">FAQ</button>
            {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${faq.isOpen ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                        {faq.question[language]}
                        <div className="faq-icon-wrapper">
                            <img
                                alt={faq.isOpen ? 'Minus Icon' : 'Plus Icon'}
                                src={faq.isOpen ? minusSymbol : plusSymbol}
                                className="faq-icon"
                            />
                        </div>
                    </div>
                    {faq.isOpen && <div className="faq-answer">{faq.answer[language]}</div>}
                </div>
            ))}
        </div>
    );
}

export default Faq;