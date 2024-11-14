export type ThemeType = 'pink' | 'blue' | 'orange';

export interface ThemeColors {
    primary: string;
    accent: string;
    background: string;
    surface: string;
    error: string;
    text: string;
    placeholder: string;
    backdrop: string;
    notification: string;
    onSurface: string;
    // 自定义颜色
    cardBackground: string;
    dialogBackground: string;
    calendarDot: string;
    calendarSelected: string;
    calendarToday: string;
    switchTrackTrue: string;
    fabBackground: string;
}

export interface AppTheme {
    colors: ThemeColors;
}
