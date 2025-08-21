export default function SidePaddingContainer({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={`w-full xl:max-w-[1280px] xxl:max-w-[1360px] max-w-full my-5 md:my-6 mx-auto ${className}`}
            {...props}
        />
    )
}