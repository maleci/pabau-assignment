import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";

export function HeroTitle({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
    return (
        <div className={`flex flex-col items-center justify-center gap-6 lg:items-start lg:justify-evenly lg:gap-12 ${className}`}>
            { children }
        </div>
    )
}

export function HeroBlob({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
    return (
        <div className={`relative h-36 lg:h-auto lg:w-[35vw] mt-12 lg:mt-0 aspect-16/10 ${className}`}>
            <div className="w-full h-full flex justify-center items-center overflow-hidden lg:rounded-bl-[22.5rem] lg:rounded-br-[9.5rem] bg-gradient-to-t from-[#FF5B1C] to-[#FF8C60]">
                {children}

                <div className="absolute items-center justify-center hidden w-20 rounded-full lg:flex bg-background -bottom-10 right-1/3 aspect-square">
                    <Image src={Logo} alt="VibeStrings" className="w-1/3" />
                </div>
            </div>
        </div>
    );
}

export function HeroLogo({ link }: { link?: { text: string, href: string } }) {
    return (
        <div className="flex flex-col justify-center gap-1">
            {link && <Link href={link.href}>
                <span className="inline-flex font-bold">
                    <ChevronLeft className="mr-2" strokeWidth={1.5} /> {link.text}
                </span>
            </Link> }

            <span className="flex items-center gap-2">
                <Image src={Logo} alt="VibeStrings" className="w-6 aspect-square" />
                <span className="text-2xl font-normal normal-case">VibeStrings</span>
            </span>
        </div>
    );
}