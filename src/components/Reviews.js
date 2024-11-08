import React from 'react';
import avatarNatalia from '../images/avatar_girl_white.png';
import avatarSanta from '../images/avatar_girl_black.png';

function Reviews() {
    return (
        <div className="reviews-page">
            <button className="reviews-button">отзывы</button>
            <div className="reviews-container">
                <div className="review">
                    <div className='review-name'>
                        <div className="circletag circletag-white-girl"/>
                        <h3>Наталья</h3>
                    </div>
                    <div className="review-content">
                        <p>Отличные занятия, наш ребенок теперь на каникулах каждый день показывает трюки, а как плавает
                            - просто загляденье. Спасибо Саше и Ане!</p>
                        <span>#синхронноеплавание</span>
                    </div>
                </div>
                <div className="review">
                    <div className='review-name'>
                        <div className="circletag circletag-black-girl"/>
                        <h3>Санта</h3>
                    </div>
                    <div className="review-content">
                    <p>С Вами - the best of both worlds, я очень рада, что мы Вас нашли. </p>
                        <span>#индивидуальнаятренировка</span>
                    </div>
                </div>
                <div className='review'>
                    <div className='review-name'>
                        <div className="circletag circletag-black-girl"/>
                        <h3>Назим</h3>
                    </div>
                    <div className="review-content">
                        <p>Я тоже хочу оставить отзыв, у нас было одно пробное занятие с Сашей. Очень довольны! Дочка 3х
                            лет
                            сразу привыкла к ней, получился очень хороший тандем. С детьми ладят хорошо, даже с такими
                            малышами как моя.</p>
                        <span>#спортивноеплавание</span>
                    </div>
                </div>
            </div>
                <button className="load-more-button">Загрузить еще</button>
            </div>
            );
            }

            export default Reviews;
