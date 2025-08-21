type NotFoundProps = {
    message?: string
}

export default function NotFound({ message }: NotFoundProps) {
    return (
        <>
            <div className="h-[80vh] flex flex-col justify-center items-center">
                <h1 className="text-center font-semibold text-[clamp(6rem,20vw,18rem)] leading-none bg-gradient-to-t from-[#FF5B1C] to-[#FF8C60] bg-clip-text text-transparent">
                    404
                </h1>
                {message && <h4 className="text-lg text-center">{message}</h4>}
            </div>
        </>
    );
}