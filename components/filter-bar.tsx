"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Dropdown from "./ui/dropdown";
import Input from "./ui/input";
import { useEffect, useState } from "react";

export default function FilterBar({ categories, locale }: { categories: string[], locale: any }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const categoryParam = searchParams.get("category") || "";
    const queryParam = searchParams.get("query") || "";

    const [inputValue, setInputValue] = useState(queryParam);

    // Debounce query param updates
    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (inputValue) params.set("query", inputValue);
            else params.delete("query");
            router.replace(`?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(handler);
    }, [inputValue, router, searchParams]);

    const setCategory = (value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set("category", value);
        else params.delete("category");
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col items-center gap-2 md:flex-row">
            <Dropdown
                options={categories}
                placeholder={locale["categoryPlaceholder"]}
                value={categoryParam || undefined}
                onChange={setCategory}
                className="flex-1"
            />
            <Input
                placeholder={locale?.["searchPlaceholder"]}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
            />
        </div>
    );
}
