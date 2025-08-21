import { Footer, FooterGroup, FooterGroupTitle, FooterContent, FooterGroupContent, FooterFooter } from "./ui/footer";

import Image from "next/image";

import Logo from "@/public/logo.svg"

import Link from "next/link";

import "flag-icons/css/flag-icons.min.css";
import LanguageSelector from "./language-selector";
import { Facebook, Instagram, Mail, MapPin, Twitter } from "lucide-react";

export default function AppFooter({ locale }: { locale: any }) {
    return (
        <Footer className="bg-footer">
            <FooterContent>
                {/* Brand Info */}
                <FooterGroup>
                    <FooterGroupTitle>
                        <div className="flex items-center gap-2">
                            <Image src={Logo} alt="Logo" className="w-10 aspect-square" />
                            <span className="text-[2.5rem] font-normal normal-case">VibeStrings</span>
                        </div>
                    </FooterGroupTitle>

                    <div className="flex items-center gap-2">
                        <Mail className="stroke-muted"/>
                        <span>Enquiry@VibeStrings.com</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="stroke-muted"/>
                        <span>San Francisco</span>
                    </div>
                </FooterGroup>

                {/* Pages */}
                <FooterGroup>
                    <FooterGroupTitle>{locale["footerPagesTitle"]}</FooterGroupTitle>
                    <FooterGroupContent>
                        {[
                            locale["footerPagesStore"],
                            locale["footerPagesCollections"],
                            locale["footerPagesSupport"]
                        ].map((page) => (
                            <Link key={page} href="/">
                                <span className="uppercase text-[#12121299]">{page}</span>
                            </Link>
                        ))}
                    </FooterGroupContent>
                </FooterGroup>

                {/* Product */}
                <FooterGroup>
                    <FooterGroupTitle>{locale["footerProductTitle"]}</FooterGroupTitle>
                    <FooterGroupContent>
                        {[
                            locale["footerProductTerms"],
                            locale["footerProductPrivacy"],
                            locale["footerProductCopyright"]
                        ].map((item) => (
                            <Link key={item} href="/">
                                <span className="uppercase text-[#12121299]">{item}</span>
                            </Link>
                        ))}
                    </FooterGroupContent>
                </FooterGroup>

                {/* Social */}
                <FooterGroup>
                    <FooterGroupTitle>{locale["footerFollowTitle"]}</FooterGroupTitle>
                    <FooterGroupContent>
                        <div className="flex gap-6">
                            <Link href="/">
                                <Facebook className="stroke-muted"/>
                            </Link>
                            <Link href="/">
                                <Twitter className="stroke-muted"/>
                            </Link>
                            <Link href="/">
                                <Instagram className="stroke-muted"/>
                            </Link>
                        </div>
                    </FooterGroupContent>
                </FooterGroup>

                <FooterGroup>
                    <FooterGroupTitle>{locale["footerLanguageTitle"]}</FooterGroupTitle>
                    <FooterGroupContent>
                        <LanguageSelector languages={[
                            {
                                name: "EN",
                                code: "en",
                                flag: "gb"
                            },
                            {
                                name: "SHQ",
                                code: "al"
                            },
                        ]} />
                    </FooterGroupContent>
                </FooterGroup>
            </FooterContent>

            <FooterFooter className="mt-12">
                {locale["copyright"]}
            </FooterFooter>
        </Footer>
    )
}

// function FooterTitle({ children }: Readonly<{ children: React.ReactNode }>) {
//     return (
//         <span className="text-lg font-bold uppercase">
//             {children}
//         </span>
//     );
// }