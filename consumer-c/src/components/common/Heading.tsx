import React from "react";

interface HeadingProps {
    readonly as?: "h1" | "h2" | "h3";
    readonly children: React.ReactText;
}

export function Heading(props: HeadingProps) {
    const {as: Comp = "h2", children} = props;
    return <Comp>{children}</Comp>
}