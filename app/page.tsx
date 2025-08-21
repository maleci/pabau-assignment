import { slugify } from "@/lib/util";

import Image from "next/image";

import Logo from "@/public/logo.svg";
import HomeImage from "@/app/assets/images/home.jpg";

import App1Image from "@/app/assets/images/app1.png";
import App2Image from "@/app/assets/images/app2.png";

import GoogleBadge from "@/app/assets/images/google.svg";
import AppleBadge from "@/app/assets/images/apple.svg";

import apolloClient from "@/lib/apollo";
import { gql } from "@apollo/client";
import Link from "next/link";
import SidePaddingContainer from "@/components/side-padding";

import { cookies } from "next/headers";
import { getTranslations } from "@/lib/language";
import { LocalizedText } from "@/components/localized-text";

import { LayoutGrid, Truck, Wallet } from "lucide-react";
import { HeroBlob, HeroLogo, HeroTitle } from "@/components/hero";

export default async function Home() {
    const cookieHeader = (await cookies()).toString();
    const locale = await getTranslations(cookieHeader, "home");

    const { data } = await apolloClient.query({
        query:
            gql`
            query GetBrands {
                findAllBrands {
                id
                name
                image
            }
        }
    `,
    });

    type BrandType = {
        id: string;
        name: string;
        image: string;
    };

    const brands: BrandType[] = data.findAllBrands;

    return (
        <>
            <div className="flex flex-col py-12 gap-36 lg:py-36 lg:pt-0">
                {/* Hero Section */}
                <section className="flex flex-col justify-around lg:flex-row lg:items-center">
                    {/* Left Content */}
                    <HeroTitle>
                        {/* Logo */}
                        <HeroLogo />

                        {/* Hero Text */}
                        <div className="flex flex-col items-center gap-4 text-center lg:text-left">
                            <LocalizedText text={locale["hero"] ?? ""} className="text-[2.5rem] lg:text-[3.5rem] font-bold text-center" />
                            <LocalizedText text={locale["heroDescription"] ?? ""} className="max-w-lg text-center text-muted" />
                        </div>
                    </HeroTitle>

                    {/* Right Content - Hero Image */}

                    <HeroBlob className="h-144 aspect-[20/18]">
                        <Image
                            src={HomeImage}
                            alt="Home"
                            className="w-full h-full object-cover object-[center_90%] lg:object-bottom"
                        />
                    </HeroBlob>
                </section>

                {/* Brands Section */}
                <section className="">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <LocalizedText text={locale["header1"] ?? ""} className="text-[2.8rem] font-bold text-center" />
                        <LocalizedText text={locale["header1Description"] ?? ""} className="max-w-md text-muted" />
                    </div>

                    <SidePaddingContainer className="flex flex-wrap items-center justify-center gap-x-36">
                        {brands.map((brand, index) => (
                            <Link href={`/brands/${slugify(brand.name)}`} key={index}>
                                <div className="flex items-center justify-center">
                                    <div className="relative w-40 h-40">
                                        <Image
                                            src={brand.image}
                                            alt={brand.name || "Brand image"}
                                            fill
                                            className="object-contain lg:grayscale lg:opacity-50 lg:hover:grayscale-0 lg:hover:opacity-100"
                                            unoptimized // This is because the images are from all kinds different domains,
                                        // and NextJS requires for all outside image domains to be explicitly listed if we want image optimization.
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </SidePaddingContainer>
                </section>

                {/* Why VibeStrings Section */}
                <section className="flex flex-col gap-20 py-24 bg-foreground">
                    <LocalizedText text={locale["header2"] ?? ""} className="text-[2.8rem] text-background text-center" />

                    <div className="flex flex-wrap gap-12 justify-evenly">
                        {Array.from([
                            { header: locale["category1Header"], description: locale["category1Description"], Icon: LayoutGrid },
                            { header: locale["category2Header"], description: locale["category2Description"], Icon: Truck },
                            { header: locale["category3Header"], description: locale["category3Description"], Icon: Wallet },
                        ]).map((category, index) => {
                            const IconComponent = category.Icon;
                            return (
                                <div key={index} className="flex flex-col items-center gap-6 text-center">
                                    <div className="p-4 w-fit bg-secondary rounded-2xl">
                                        <IconComponent size={30} strokeWidth={1.5} color="#A4A4A4" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-lg font-bold tracking-widest uppercase text-background">
                                            {category.header}
                                        </h1>
                                        <h4 className="text-sm text-muted max-w-2xs">{category.description}</h4>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Mobile App Section */}
                <section className="flex flex-col items-center justify-center gap-24 py-12 lg:flex-row">
                    <div className="flex flex-col items-center gap-8 text-center lg:text-left">
                        <LocalizedText text={locale["header3"] ?? ""} className="text-[2.5rem] lg:text-[3rem] text-center" />

                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href={"/"}><Image src={GoogleBadge} alt="Get it on Google Play" className="w-auto h-auto" width={200} height={60} /></Link>
                            <Link href={"/"}><Image src={AppleBadge} alt="Download on the App Store" className="w-auto h-auto" width={200} height={60} /></Link>
                        </div>
                    </div>

                    <div className="relative max-w-[30vw] h-[38vh] flex justify-center items-center bg-accent [border-radius:50%/50%]">
                        <Image src={App1Image} alt="Mobile app image 1" className="mb-10 -mr-4 sm:-mr-8 lg:-mr-12" />
                        <Image src={App2Image} alt="Mobile app image 2" className="mt-10 -ml-4 sm:-ml-8 lg:-ml-12" />
                    </div>
                </section>
            </div>
        </>
    );
}
