"use client";

import { ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DropdownProps {
    value?: string;
    options: string[];
    placeholder?: string;
    onChange?: (value: string | null) => void;
    className?: string;
}

export default function Dropdown({ value, options, placeholder = "Select", onChange, className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        setIsOpen(false);
        onChange?.(option);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent toggling dropdown
        onChange?.(null);
    };

    return (
        <div className={`relative w-64 ${className}`} ref={dropdownRef}>
            {/* Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white border border-gray-300 px-4 py-2 text-left flex justify-between items-center shadow-sm 
                            transition-shadow cursor-pointer
                            focus:outline-none focus:ring-3 focus:ring-accent focus:border-accent
                            ${isOpen ? "outline-none ring-3 ring-accent border-accent" : ""}
                `}
            >
                <span className="flex gap-3">
                    {value && (
                        <span
                            onClick={handleClear}
                            role="button"
                            className="text-gray-400 cursor-pointer select-none hover:text-gray-600"
                        >
                            <X />
                        </span>
                    )}

                    <span className={`${value ? " text-black" : "text-gray-400"}`}>
                        {value || placeholder}
                    </span>
                </span>

                <div className="flex items-center gap-2">
                    <ChevronDown className={`stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </div>
            </div>

            {/* Dropdown Options */}
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 shadow-lg max-h-60">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 transition cursor-pointer hover:bg-accent/10"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
