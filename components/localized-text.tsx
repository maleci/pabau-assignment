type LocalizedTextProps = {
    text: string | string[];
    className?: string;
};

export function LocalizedText({ text, className }: LocalizedTextProps) {
    // Normalize to array so we can map consistently
    const lines = Array.isArray(text) ? text : [text];

    return (
        <span className={className}>
            {lines.map((line, lineIndex) => {
                const parts = line.split(/(<accent>.*?<\/accent>)/g);

                return (
                    <span key={lineIndex} className="block">
                        {parts.map((part, i) => {
                            if (part.startsWith("<accent>") && part.endsWith("</accent>")) {
                                const inner = part.replace(/<\/?accent>/g, "");
                                return (
                                    <span key={i} className="text-accent">
                                        {inner}
                                    </span>
                                );
                            }
                            return <span key={i}>{part}</span>;
                        })}
                    </span>
                );
            })}
        </span>
    );
}