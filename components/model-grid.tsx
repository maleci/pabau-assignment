"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/util";
import SidePaddingContainer from "./side-padding";
import { ModelBasic } from "@/lib/types";

export default function ModelGrid({
    initialProducts,
    slug,
    locale,
    category
}: {
    initialProducts: ModelBasic[];
    slug: string;
    locale?: any;
    category?: string
}) {
    const CHUNK_SIZE = 3;
    const FAKE_DELAY = 800; // 0.8s fake fetch delay
    const [displayCount, setDisplayCount] = useState(CHUNK_SIZE);
    const [products, setProducts] = useState<ModelBasic[]>(
        initialProducts.slice(0, CHUNK_SIZE)
    );
    const [loading, setLoading] = useState(false);

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loading) return; // wait until fake fetching finishes

        const nextProducts = initialProducts.slice(0, displayCount);
        setProducts(nextProducts);
    }, [displayCount, initialProducts, loading]);

    // IntersectionObserver for infinite scroll
    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    !loading &&
                    displayCount < initialProducts.length
                ) {
                    setLoading(true);
                    // Fake fetch delay
                    setTimeout(() => {
                        setDisplayCount((prev) =>
                            Math.min(prev + CHUNK_SIZE, initialProducts.length)
                        );
                        setLoading(false);
                    }, FAKE_DELAY);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [displayCount, initialProducts.length, loading]);

    return (
        <SidePaddingContainer>
            {products.length > 0 &&
                <div className="grid gap-6 px-4 lg:grid-cols-3 lg:gap-y-16">
                    {products
                        .filter(p => !category || p.type.toLowerCase() === category.toLowerCase())
                        .map((p, i) => (
                            <Link key={i} href={`/brands/${slug}/${slugify(p.name)}`}>
                                <div className="relative flex flex-col justify-between w-full opacity-0 h-52 animate-fadeIn">
                                    <Image
                                        src={p.image}
                                        alt={p.name}
                                        width={0}
                                        height={0}
                                        className="object-contain w-full h-6/10"
                                        unoptimized
                                    />
                                    <div>
                                        <h1 className="font-medium">{p.name}</h1>
                                        <h1 className="text-sm text-muted">${p.price}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            }

            {/* Sentinel for intersection observer */}
            {products.length > 0 && <div ref={sentinelRef} className="h-10" />}

            {loading && <p className="py-4 text-center">{locale["productGridLoading"]}</p>}
            {!loading && displayCount >= initialProducts.length && (
                <p className="py-4 text-center">{locale["productGridEnd"]}</p>
            )}
        </SidePaddingContainer>
    );
}