'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';

// Photo grid for a location page. Clicking a photo opens it enlarged in a
// centred overlay (not full-screen) with prev/next and Esc to close.
export default function LocationPhotos({photos, name, lang}) {
    const [open, setOpen] = useState(-1);

    useEffect(() => {
        if (open < 0) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(-1);
            if (e.key === 'ArrowRight') setOpen((v) => (v + 1) % photos.length);
            if (e.key === 'ArrowLeft') setOpen((v) => (v - 1 + photos.length) % photos.length);
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, photos.length]);

    if (!photos || photos.length === 0) return null;

    const altText = (i) =>
        `${name} — ${lang === 'ru' ? 'занятия по плаванию' : 'swimming lessons'} ${i + 1}`;

    return (
        <>
            <div className="location-photos">
                {photos.map((src, i) => (
                    <button key={i} type="button" className="location-photo-btn"
                            onClick={() => setOpen(i)} aria-label={altText(i)}>
                        {/* uploaded photos (/api/img/…) are already compressed —
                            skip the optimizer's second JPEG pass */}
                        <Image src={src} width={800} height={600}
                               alt={altText(i)} className="location-photo" quality={85}
                               unoptimized={src.startsWith('/api/img/')}
                               sizes="(max-width: 660px) 90vw, 45vw"/>
                    </button>
                ))}
            </div>

            {open >= 0 && (
                <div className="location-lightbox" onClick={() => setOpen(-1)}>
                    {photos.length > 1 && (
                        <button type="button" className="lb-nav lb-prev" aria-label="Previous"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpen((open - 1 + photos.length) % photos.length);
                                }}>‹</button>
                    )}
                    <img src={photos[open]} alt={altText(open)}
                         onClick={(e) => e.stopPropagation()}/>
                    {photos.length > 1 && (
                        <button type="button" className="lb-nav lb-next" aria-label="Next"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpen((open + 1) % photos.length);
                                }}>›</button>
                    )}
                    <button type="button" className="lb-close" aria-label="Close"
                            onClick={() => setOpen(-1)}>×</button>
                </div>
            )}
        </>
    );
}
