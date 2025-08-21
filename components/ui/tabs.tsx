"use client";

import { useState, ReactNode, useRef, useEffect } from "react";

type Tab = {
    title: string;
    content: ReactNode;
};

type TabsProps = {
    tabs: [Tab, Tab]; // two tabs
};

export default function Tabs({ tabs }: TabsProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabsRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

    useEffect(() => {
        if (tabsRef.current) {
            const tabButtons = tabsRef.current.children;
            const activeTab = tabButtons[activeIndex] as HTMLElement;
            setIndicatorStyle({
                width: activeTab.offsetWidth,
                left: activeTab.offsetLeft,
            });
        }
    }, [activeIndex, tabsRef.current?.offsetWidth]);

    return (
        <div className="relative">
            {/* Tab buttons */}
            <div className="relative flex justify-center border-b border-gray-300" ref={tabsRef}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`w-sm px-4 py-2 font-semibold text-lg lg:text-2xl text-center ${activeIndex === index ? "text-accent" : "text-gray-500"} cursor-pointer`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {tab.title}
                    </button>
                ))}

                {/* Sliding underline */}
                <span
                    className="absolute bottom-0 h-1 transition-all duration-300 bg-accent"
                    style={{ width: `${indicatorStyle.width}px`, left: `${indicatorStyle.left}px` }}
                />
            </div>

            {/* Tab content */}
            <div className="flex justify-center mt-4">
                {tabs.map((tab, index) => (
                    <div key={index} className={activeIndex === index ? "block" : "hidden"}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
