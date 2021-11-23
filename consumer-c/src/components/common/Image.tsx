import React from "react";

interface ImageProps {
    readonly src: string;
    readonly title?: string;
}

export function Image(props: ImageProps) {
    const {src, title} = props;
    return <img src={src} title={title} alt={title}/>
}