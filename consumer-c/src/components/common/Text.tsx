import React from "react";

interface TextProps {
    readonly as?: "span" | "p";
    readonly bold?: boolean;
    readonly children: React.ReactText;
}

export function Text(props: TextProps) {
    const {as: Comp = "p", children, bold = false} = props;
    const styles = bold ? { fontWeight: "bold" } : undefined;
    return <Comp style={styles}>{children}</Comp>
}