
export type BlockType =
    | "hero"
    | "header"
    | "features"
    | "footer"
    | "text"
    | "image"
    | "button"
    | "form"
    | "columns"
    | "pricing"
    | "stats"
    | "testimonials";

export interface BuilderBlock {
    id: string;
    type: BlockType;
    content: any; // Flexible content structure
    styles?: {
        padding?: number;
        margin?: number;
        background?: string;
        color?: string;
        fontSize?: number;
        textAlign?: 'left' | 'center' | 'right';
        borderRadius?: number;
        [key: string]: any;
    };
}

export type DeviceType = "desktop" | "tablet" | "mobile";
