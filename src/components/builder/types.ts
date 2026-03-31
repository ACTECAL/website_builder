
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
    | "testimonials"
    | "spacer";

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export interface BuilderBlock {
    id: string;
    type: BlockType;
    content: any;
    styles?: {
        padding?: number;
        margin?: number;
        background?: string;
        color?: string;
        fontSize?: number;
        textAlign?: 'left' | 'center' | 'right';
        borderRadius?: number;
        boxShadow?: string;
        backdropFilter?: string;
        animation?: string;
        [key: string]: any;
    };
}

export type DeviceType = "desktop" | "tablet" | "mobile";
