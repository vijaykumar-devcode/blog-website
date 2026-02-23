import React, { useEffect, useState } from 'react';

const ReadingProgressBar = () => {
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        const updateScrollCompletion = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setCompletion(
                    Number((currentProgress / scrollHeight).toFixed(2)) * 100
                );
            }
        };

        window.addEventListener('scroll', updateScrollCompletion);

        return () => {
            window.removeEventListener('scroll', updateScrollCompletion);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-slate-100/30">
            <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent transition-all duration-150 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                style={{ width: `${completion}%` }}
            ></div>
        </div>
    );
};

export default ReadingProgressBar;
