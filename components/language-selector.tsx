"use client";

import { useEffect, useState } from "react";

type LanguageSelectorProps = {
    languages: {
        name: string
        code: string
        flag?: string
    }[]
}

function setLang(lang: string) {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    window.location.reload();
}

export default function LanguageSelector({ languages, }: LanguageSelectorProps) {
    const [current, setCurrent] = useState("en"); // english default language

    // Update on client in case cookie changed
    useEffect(() => {
        const match = document.cookie
            .split("; ")
            .find((row) => row.startsWith("lang="));

        if (match) {
            setCurrent(match.split("=")[1]);
        }
    }, []);

    return (
        <div className="flex gap-4">
            {languages.map((lang, i) => (
                <button
                    key={i}
                    onClick={() => setLang(lang.code)}
                    className={`cursor-pointer px-2 pb-1 ${current === lang.code ? "border-b-4 border-b-accent" : ""}`}
                >
                    <span className={`fi fi-${lang.flag || lang.code}`}></span> {lang.name}
                </button>
            ))}
        </div>
    );
}