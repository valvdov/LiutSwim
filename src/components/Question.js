import React from 'react';
import '../index.css';

function Question() {
    return (
        <div className="question">
            <h1 className="question_wrapper">
                <span className="question_text question_text_first">Если вы не нашли ответ</span>
                <span className="question_text question_text_second">на свой вопрос,</span>
                <span className="question_text question_text_third">напишите нам.</span>
            </h1>
            <button className="question_button">Задать вопрос</button>
        </div>
    );
}

export default Question;