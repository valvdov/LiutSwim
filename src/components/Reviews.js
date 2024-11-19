import React, {useState} from 'react';
import avatarNatalia from '../images/avatar_girl_white.png';
import avatarSanta from '../images/avatar_girl_black.png';
import minusSymbol from "../images/minus-sign.png";
import plusSymbol from "../images/plus-sign.png";
import reviewsData from "../data/dataReviews";

function Reviews({ language }) {
    const [visibleCount, setVisibleCount] = useState(3); // Сколько отзывов отображать

    const loadMore = () => {
        setVisibleCount(prevCount => Math.min(prevCount + 3, reviewsData.length));
    };

    return (
        <div className="reviews-page">
            <button className="reviews-button">{language === 'ru' ? 'отзывы' : 'reviews'}</button>
            <div className="reviews-container">
                {reviewsData.slice(0, visibleCount).map((review, index) => (
                    <div key={index} className="review">
                        <div className="review-name">
                            <div className={`circletag ${review.circle_tag}`}/>
                            <h3>{review.name[language]}</h3>
                        </div>
                        <div className="review-content">
                            <p>{review.review_content[language]}</p>
                            <span>#{review.hashtag[language]}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="load-more-container">
                {visibleCount < reviewsData.length ? (
                    <button className="load-more-button" onClick={loadMore}>
                        {language === 'ru' ? 'Загрузить ещё' : 'Load more'}
                    </button>
                ) : (
                    <div className="placeholder"/> // Пустое место
                )}
            </div>
        </div>
    );
}

export default Reviews;

