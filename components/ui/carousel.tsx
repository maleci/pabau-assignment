"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
    items: React.ReactNode[];
    className?: string;
    showArrows?: boolean;
    infinite?: boolean;
};

export default function Carousel({
    items,
    className = "",
    showArrows = true,
    infinite = true,
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = items.length;

    // swipe tracking
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const prev = () => {
        if (infinite) setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
        else if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const next = () => {
        if (infinite) setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
        else if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
        const distance = touchStartX.current - touchEndX.current;
        const minSwipe = 50; // px threshold
        if (distance > minSwipe) next();
        if (distance < -minSwipe) prev();
    };

    const leftDisabled = !infinite && currentIndex === 0;
    const rightDisabled = !infinite && currentIndex === total - 1;

    return (
        <div className={`relative flex flex-col items-center ${className}`}>
            <div className="relative flex items-center">
                {/* Left Arrow (hidden on mobile) */}
                {showArrows && total > 1 && (
                    <button
                        onClick={prev}
                        disabled={leftDisabled}
                        className={`absolute left-[-4rem] top-1/2 -translate-y-1/2 rounded-full p-3 transition-colors z-10
                        hidden sm:block
                        ${leftDisabled ? "bg-footer/50 text-gray-500 cursor-not-allowed" : "bg-accent/75 text-white hover:bg-accent/50 cursor-pointer"}`}
                    >
                        <ChevronLeft />
                    </button>
                )}

                {/* Slides container */}
                <div
                    className="overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {items.map((item, idx) => (
                            <div key={idx} className="flex justify-center flex-shrink-0 w-full">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow (hidden on mobile) */}
                {showArrows && total > 1 && (
                    <button
                        onClick={next}
                        disabled={rightDisabled}
                        className={`absolute right-[-4rem] top-1/2 -translate-y-1/2 rounded-full p-3 transition-colors z-10
                        hidden sm:block
                        ${rightDisabled ? "bg-footer/50 text-gray-500 cursor-not-allowed" : "bg-accent/75 text-white hover:bg-accent/50 cursor-pointer"}`}
                    >
                        <ChevronRight />
                    </button>
                )}
            </div>

            {/* Dots */}
            {total > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {items.map((_, idx) => (
                        <span
                            key={idx}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer ${currentIndex === idx ? "bg-accent/75" : "bg-footer/50"
                                }`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}