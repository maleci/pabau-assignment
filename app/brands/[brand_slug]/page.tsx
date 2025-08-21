import Image from "next/image";

import Logo from "@/public/logo.svg"
import Dropdown from "@/components/ui/dropdown";
import Input from "@/components/ui/input";
import apolloClient from "@/lib/apollo";
import ModelGrid from "@/components/model-grid";
import { getBrandBySlug, getBrandDetails, getBrandModels, searchModels } from "@/lib/util";
import NotFound from "@/components/not-found-page";
import { cookies } from "next/headers";
import { getTranslations } from "@/lib/language";
import { LocalizedText } from "@/components/localized-text";
import FilterBar from "@/components/filter-bar";
import { HeroBlob, HeroLogo, HeroTitle } from "@/components/hero";

export default async function BrandPage({ params, searchParams }: { params: Promise<{ brand_slug: string }>, searchParams?: { [key: string]: string | string[] | undefined } }) {
    const cookieHeader = (await cookies()).toString();
    const locale = await getTranslations(cookieHeader, "brand");

    const { brand_slug } = await params;

    // This fetch is required if we want our app to index by brand name instead of ID
    // Which helps with readability and SEO
    const brand = await getBrandBySlug(apolloClient, brand_slug);
    if (!brand) return (
        <NotFound message="The brand you are looking for doesn't exist!" />
    );

    const brandDetails = await getBrandDetails(apolloClient, brand.id);

    const category = (await searchParams)?.category;
    const query = (await searchParams)?.query;

    let models;

    if (query) {
        models = await searchModels(apolloClient, brand.id, Array.isArray(query) ? query[0] : query);
    } else if (category) {
        // API doesn't support filtering models by category/type, so instead we sort
        // Otherwise this should get only the models of set category
        models = await getBrandModels(apolloClient, brand.id, {
            field: "type",
            order: "ASC",
        });
    } else {
        models = await getBrandModels(apolloClient, brand.id, {
            field: "name",
            order: "ASC",
        });
    }

    return (
        <>
            <div className="flex flex-col py-12 gap-36 lg:py-36 lg:pt-0">
                <section className="flex flex-col justify-around lg:flex-row lg:items-center">
                    {/* Left Content */}
                    <HeroTitle>
                        {/* Logo */}
                        <HeroLogo
                            link={{
                                text: locale["back"],
                                href: "/",
                            }}
                        />

                        {/* Hero Text */}
                        <span className="flex flex-col items-center justify-center">
                            <LocalizedText text={locale["header1"]} className="text-[2.8rem] font-bold text-center" />

                            {/* I'm too lazy to add argument functionality to <LocalizedText> */}
                            <LocalizedText text={
                                locale["header1DescriptionP1"]
                                + " " + brand.name + " "
                                + locale["header1DescriptionP2"]
                                + " " + brand.name + " "
                                + locale["header1DescriptionP3"]
                            }
                                className="max-w-lg text-center text-muted"
                            />
                        </span>
                    </HeroTitle>

                    <HeroBlob>
                        <Image
                            width={200}
                            height={50}
                            src={brandDetails.image}
                            alt={brand.name}
                            className="object-cover w-full max-w-xs lg:w-1/2 lg:mb-10 filter grayscale-100 opacity-40"
                            unoptimized
                        />
                    </HeroBlob>
                </section>

                <section className="flex flex-col items-center gap-24">
                    <div className="flex flex-col items-center w-full max-w-4xl gap-4 px-4">
                        <LocalizedText
                            text={locale["header2"]}
                            className="text-[2.8rem] font-bold text-center"
                        />

                        <FilterBar categories={brandDetails.categories.map((category) => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase())} locale={locale} />
                    </div>

                    <ModelGrid
                        initialProducts={models}
                        slug={brand_slug}
                        locale={locale}
                        category={Array.isArray(category) ? category[0] : category}
                    />
                </section>
            </div>
        </>
    );
}