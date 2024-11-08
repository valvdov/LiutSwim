import React, { useState } from 'react';
import plusIcon from '../images/plusIcon.png'; // Путь к изображению иконки "+"
import faqsData from "../data/dataFaq";

function Faq() {
    const [faqs, setFaqs] = useState(faqsData.map(faq => ({ ...faq, isOpen: false })));

    const toggleFAQ = index => {
        setFaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.isOpen = !faq.isOpen;
            } else {
                faq.isOpen = false;
            }
            return faq;
        }));
    };

    return (
        <div className="faq-container">
            <button className="faq-button">faq</button>
            {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${faq.isOpen ? 'active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                        {faq.question}
                        <span className={`faq-icon ${faq.isOpen ? 'opened' : 'closed'}`}>+</span>
                    </div>
                    {faq.isOpen && <div className="faq-answer">{faq.answer}</div>}
                </div>
            ))}
        </div>
    );
}


export default Faq;
