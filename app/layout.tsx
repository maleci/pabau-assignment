import "./globals.css";

import { Metadata } from "next";

import localFont from 'next/font/local'
import AppFooter from "@/components/app-footer";
import { cookies } from "next/headers";
import { getTranslations } from "@/lib/language";

const satoshi = localFont({
    src: "./assets/fonts/satoshi/Fonts/TTF/Satoshi-Variable.ttf"
})

// Would be nice to have dynamic metadata for brands and models, but that would need aditional (duplicate) fetches...
export const metadata: Metadata = {
    title: "VibeStrings",
    description: "Browse top quality guitars online",
    icons: {
        icon: "/logo.svg",
        shortcut: "/logo.svg",
        apple: "/logo.svg",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieHeader = (await cookies()).toString();
    const locale = await getTranslations(cookieHeader, "footer");

    return (
        <html lang="en">
            <body
                className={`${satoshi.className} antialiased`}
            >
                {children}

                <AppFooter locale={locale} />
            </body>
        </html>
    );
}
