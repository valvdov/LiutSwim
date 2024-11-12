import React from 'react';
import spanImg from '../images/loyalty_li.png'

function Loyalty() {
    return (
        <div id="programm" className="loyalty-program-page">
                <button className="loyalty-program-button">программа лояльности</button>
                <h1 className="main-offer">В нашем клубе есть программа лояльности</h1>
                <p className="description">
                    Став ее участником, вы получите ряд интересных преимуществ, скидок и привилегий, которые
                    предоставляются
                    исключительно участникам программы лояльности.
                </p>
                <div className="details">
                    <div className="discount-info">
                        <div className='discount-div'>
                            <span className="discount">50<sup>%</sup></span>
                            <p><img className='span_img' alt='li' src={spanImg}/>Скидка на первое занятие</p>
                        </div>
                        <div className='duration-div'>
                            <span className="additional-discount">10<sup>%</sup></span>
                            <p><img className='span_img' alt='li' src={spanImg}/>Скидка для постоянных клиентов</p>
                        </div>
                        <div className='additional-discount-div'>
                            <span className="duration">6 <sub>месяцев</sub></span>
                            <p><img className='span_img' alt='li' src={spanImg}/>Подарки от клуба каждые</p>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Loyalty;
