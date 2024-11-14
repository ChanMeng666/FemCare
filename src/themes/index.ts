import { Theme, ThemeMode } from '../types/theme';

const createTheme = (mode: ThemeMode): Theme => ({
    mode,
    colors: {
        primary: {
            light: mode === 'light' ? '#FFD6E6' : '#FF8DC7',
            main: mode === 'light' ? '#FF69B4' : '#FF69B4',
            dark: mode === 'light' ? '#CC5490' : '#CC5490',
            contrast: mode === 'light' ? '#FFFFFF' : '#000000',
        },
        secondary: {
            light: mode === 'light' ? '#E6F4F1' : '#A8DAD3',
            main: mode === 'light' ? '#A8DAD3' : '#7FC8BE',
            dark: mode === 'light' ? '#7FC8BE' : '#5BA69D',
            contrast: mode === 'light' ? '#000000' : '#FFFFFF',
        },
        error: {
            light: '#FFE6E6',
            main: '#FF4D4D',
            dark: '#CC3333',
        },
        warning: {
            light: '#FFF4E5',
            main: '#FFA726',
            dark: '#F57C00',
        },
        success: {
            light: '#E8F5E9',
            main: '#66BB6A',
            dark: '#43A047',
        },
        info: {
            light: '#E3F2FD',
            main: '#42A5F5',
            dark: '#1E88E5',
        },
        background: {
            default: mode === 'light' ? '#F5F5F7' : '#121212',
            paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
            elevated: mode === 'light' ? '#FFFFFF' : '#2C2C2C',
        },
        text: {
            primary: mode === 'light' ? '#1A1A1A' : '#FFFFFF',
            secondary: mode === 'light' ? '#666666' : '#A0A0A0',
            disabled: mode === 'light' ? '#999999' : '#666666',
        },
        divider: mode === 'light' ? '#E0E0E0' : '#404040',
        calendar: {
            dot: mode === 'light' ? '#FF69B4' : '#FF8DC7',
            selected: mode === 'light' ? '#FF69B4' : '#FF8DC7',
            today: mode === 'light' ? '#A8DAD3' : '#7FC8BE',
        },
        chart: {
            gradient: mode === 'light'
                ? ['#FFD6E6', '#FFF5F7']
                : ['#FF8DC7', 'transparent'],
            line: mode === 'light' ? '#FF69B4' : '#FF8DC7',
        },
    },
    typography: {
        h1: {
            fontSize: 28,
            lineHeight: 34,
            fontWeight: '700',
        },
        h2: {
            fontSize: 24,
            lineHeight: 30,
            fontWeight: '600',
        },
        h3: {
            fontSize: 20,
            lineHeight: 26,
            fontWeight: '600',
        },
        body1: {
            fontSize: 16,
            lineHeight: 24,
        },
        body2: {
            fontSize: 14,
            lineHeight: 20,
        },
        button: {
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '500',
            textTransform: 'none',
        },
        caption: {
            fontSize: 12,
            lineHeight: 16,
        },
    },
    spacing: {
        unit: 4,
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
    },
    shadows: {
        sm: mode === 'light'
            ? '0 2px 4px rgba(0,0,0,0.1)'
            : '0 2px 4px rgba(0,0,0,0.3)',
        md: mode === 'light'
            ? '0 4px 8px rgba(0,0,0,0.1)'
            : '0 4px 8px rgba(0,0,0,0.3)',
        lg: mode === 'light'
            ? '0 8px 16px rgba(0,0,0,0.1)'
            : '0 8px 16px rgba(0,0,0,0.3)',
    },
});

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');
