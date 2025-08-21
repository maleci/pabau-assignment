import Image from "next/image";

import apolloClient from "@/lib/apollo";
import { getBrandBySlug, getBrandModels, getModelBySlug, getModelDetails } from "@/lib/util";

import NotFound from "@/components/not-found-page";
import Tabs from "@/components/ui/tabs";

import { cookies } from "next/headers";
import { getTranslations } from "@/lib/language";
import { Musician, Specs } from "@/lib/types";
import Carousel from "@/components/ui/carousel";
import SidePaddingContainer from "@/components/side-padding";
import { HeroBlob, HeroLogo, HeroTitle } from "@/components/hero";

export default async function ProductPage({ params, }: { params: Promise<{ brand_slug: string, model_slug: string }> }) {
    const cookieHeader = (await cookies()).toString();
    const locale = await getTranslations(cookieHeader, "model");

    const { brand_slug, model_slug } = await params;

    // These 2 fetches are required if we want our app to index by brand and product name instead of ID
    // Which helps with readability and SEO
    const brand = await getBrandBySlug(apolloClient, brand_slug);
    if (!brand) return (
        <NotFound message="The brand you are looking for does not exist." />
    );

    const basicModel = await getModelBySlug(apolloClient, brand.id, model_slug);
    if (!basicModel) return (
        <NotFound message="The model you are looking for does not exist." />
    );

    const modelDetails = await getModelDetails(apolloClient, brand.id, basicModel.id);

    return (
        <>
            <div className="flex flex-col py-12 gap-36 lg:py-36 lg:pt-0">
                <section className="flex flex-col justify-around lg:flex-row lg:pb-0 lg:items-center">
                    {/* Left Content */}
                    <HeroTitle>
                        {/* Logo */}
                        <HeroLogo
                            link={{
                                text:
                                    locale["backP1"]
                                    + " " + brand.name + " "
                                    + locale["backP2"],
                                href: `/brands/${brand_slug}`,
                            }}
                        />

                        {/* Hero Text */}
                        <h1 className="flex justify-center items-center gap-3 text-[3.5rem] font-bold">
                            <span>{modelDetails.name}</span>
                        </h1>
                    </HeroTitle>

                    <HeroBlob>
                        <Image
                            src={modelDetails.image}
                            alt={modelDetails.name}
                            width={200}
                            height={50}
                            className="object-cover w-full max-w-xs lg:w-1/2 lg:mb-20 lg:-rotate-50"
                            unoptimized
                        />
                    </HeroBlob>
                </section >

                <section className="flex items-center justify-center">
                    <SidePaddingContainer className="px-4 lg:px-24">
                        <Tabs tabs={[
                            { title: locale["specificationsTab"], content: <ModelSpecification description={modelDetails.description} modelSpecs={modelDetails.specs} /> },
                            { title: locale["musiciansTab"], content: <ModelMusicians musicians={modelDetails.musicians} /> }
                        ]} />
                    </SidePaddingContainer>
                </section>
            </div >
        </>
    );
}

function ModelSpecification({ description, modelSpecs }: { description: string, modelSpecs: Specs }) {
    return (
        <div className="flex flex-col max-w-6xl gap-12 text-lg lg:text-2xl lg:gap-24 lg:p-24">
            <span>
                {description}
            </span>

            <ul className="text-center lg:text-left">
                <li>Body Wood: {modelSpecs.bodyWood}</li>
                <li>Neck Wood: {modelSpecs.neckWood}</li>
                <li>Fingerboard: {modelSpecs.fingerboardWood}</li>
                <li>Pickups: {modelSpecs.pickups}</li>
                <li>Tuners: {modelSpecs.tuners}</li>
                <li>Scale Length: {modelSpecs.scaleLength}</li>
                <li>Bridge: {modelSpecs.bridge}</li>
            </ul>
        </div>
    );
}

function MusicianPage({ musicians }: { musicians: Musician[] }) {
    return (
        <div className="flex flex-wrap justify-center gap-6 w-fit">
            {musicians.map((musician, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-2.5 lg:gap-5 bg-[#FFEFE8] p-2.5 lg:p-5 w-md items-center"
                >
                    {/* Square image */}
                    <div className="w-full">
                        <div className="w-full overflow-hidden aspect-square">
                            <Image
                                src={musician.musicianImage}
                                alt={musician.name}
                                width={384}
                                height={384}
                                className="object-cover w-full h-full"
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <h2 className="text-2xl font-medium text-center text-muted">{musician.name}</h2>
                </div>
            ))}
        </div>
    );
}

function ModelMusicians({ musicians }: { musicians: Musician[] }) {
    const pages = Array.from(
        { length: Math.ceil(musicians.length / 2) },
        (_, i) => musicians.slice(i * 2, i * 2 + 2)
    );

    return (
        <Carousel
            items={pages.map((chunk, idx) => <MusicianPage key={idx} musicians={chunk} />)}
            infinite={false}
            className=""
        />
    );
}