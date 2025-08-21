import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
    return (
        <input
            {...props}
            className={`w-full px-4 py-2 border border-gray-300 shadow-sm  placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent 
                        transition-shadow ${className}
            `}
        />
    );
}