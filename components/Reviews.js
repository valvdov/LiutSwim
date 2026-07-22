'use client';

import React, {useState} from 'react';
import translations from "../content/translations";

function Reviews({language, reviews}) {
    const t = translations[language] || translations["ru"];
    const [visibleCount, setVisibleCount] = useState(3);

    const loadMore = () => {
        setVisibleCount(prevCount => Math.min(prevCount + 3, reviews.length));
    };

    return (
        <div className="reviews-page">
            <button className="reviews-button">{t.reviews_button}</button>
            <div className="reviews-container">
                {reviews.slice(0, visibleCount).map((review, index) => (
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
                {visibleCount < reviews.length ? (
                    <button className="load-more-button" onClick={loadMore}>
                        {t.load_more}
                    </button>
                ) : (
                    <div className="placeholder"/>
                )}
            </div>
        </div>
    );
}

export default Reviews;
