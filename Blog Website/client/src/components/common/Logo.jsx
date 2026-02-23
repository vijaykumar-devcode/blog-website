import React from 'react';

const Logo = ({ className = "h-10", showText = true }) => {
    return (
        <div className={`flex items-center space-x-3 transition-transform active:scale-95 ${className}`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-auto drop-shadow-sm"
            >
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                </defs>
                {/* Speech Bubble Shape */}
                <path
                    d="M20 20C20 14.4772 24.4772 10 30 10H70C75.5228 10 80 14.4772 80 20V60C80 65.5228 75.5228 70 70 70H45L25 85V70H20C14.4772 70 10 65.5228 10 60V25"
                    fill="url(#logoGradient)"
                />
                {/* Braces and Slash */}
                <text
                    x="50%"
                    y="45%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="white"
                    style={{ font: 'bold 32px sans-serif', letterSpacing: '-2px' }}
                >
                    {'{ / }'}
                </text>
            </svg>
            {showText && (
                <span className="text-2xl font-black tracking-tighter text-[var(--text-primary)]">
                    Byte<span className="text-primary-600">Blog</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
