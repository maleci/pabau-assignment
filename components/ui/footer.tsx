// Component architecture inspired by shadcn/ui

export function Footer({ className, ...props }: React.ComponentProps<"section">) {
    return (
        <section
            className={`flex flex-col justify-center gap-18 py-12 ${className}`}
            {...props}
        />
    );
}

export function FooterContent({ className, ...props }: React.ComponentProps<"section">) {
    return (
        <section
            className={`lg:flex lg:flex-wrap lg:flex-row lg:justify-center lg:gap-24
                        md:grid md:grid-cols-3 md:gap-12 md:px-6
                        sm:grid sm:grid-cols-2 sm:gap-12 sm:px-6
                        grid grid-cols-1 gap-12 px-6
                        ${className}`}
            {...props}
        />
    );
}

export function FooterGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={`flex flex-col gap-6 justify-center items-center
                        lg:justify-start lg:items-start
                        ${className}`}
            {...props}
        />
    );
}

export function FooterGroupTitle({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            className={`uppercase text-lg font-bold ${className}`}
            {...props}
        />
    )
}

export function FooterGroupContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={`flex flex-col gap-4 justify-center items-center
                        lg:justify-start lg:items-start
                        ${className}`}
            {...props}
        />
    )
}

export function FooterFooter({ className, ...props }: React.ComponentProps<"span">) {
    return (
        <span
            className={`text-[#12121299] text-center ${className}`}
            {...props}
        />
    )
}