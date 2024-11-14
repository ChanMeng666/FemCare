export type ThemeMode = 'light' | 'dark' | 'pink';

export interface ColorPalette {
    // Primary colors
    primary: {
        light: string;
        main: string;
        dark: string;
        contrast: string;
    };

    // Secondary colors
    secondary: {
        light: string;
        main: string;
        dark: string;
        contrast: string;
    };

    // Semantic colors
    error: {
        light: string;
        main: string;
        dark: string;
    };
    warning: {
        light: string;
        main: string;
        dark: string;
    };
    success: {
        light: string;
        main: string;
        dark: string;
    };
    info: {
        light: string;
        main: string;
        dark: string;
    };

    // UI colors
    background: {
        default: string;
        paper: string;
        elevated: string;
    };
    text: {
        primary: string;
        secondary: string;
        disabled: string;
    };
    divider: string;

    // Component specific colors
    calendar: {
        dot: string;
        selected: string;
        today: string;
    };
    chart: {
        gradient: string[];
        line: string;
    };
}

export interface Typography {
    h1: {
        fontSize: number;
        lineHeight: number;
        fontWeight: string;
    };
    h2: {
        fontSize: number;
        lineHeight: number;
        fontWeight: string;
    };
    h3: {
        fontSize: number;
        lineHeight: number;
        fontWeight: string;
    };
    body1: {
        fontSize: number;
        lineHeight: number;
    };
    body2: {
        fontSize: number;
        lineHeight: number;
    };
    button: {
        fontSize: number;
        lineHeight: number;
        fontWeight: string;
        textTransform: 'none' | 'uppercase' | 'capitalize';
    };
    caption: {
        fontSize: number;
        lineHeight: number;
    };
}

export interface Spacing {
    unit: number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

export interface BorderRadius {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

export interface Shadow {
    sm: string;
    md: string;
    lg: string;
}

export interface Theme {
    mode: ThemeMode;
    colors: ColorPalette;
    typography: Typography;
    spacing: Spacing;
    borderRadius: BorderRadius;
    shadows: Shadow;
}
