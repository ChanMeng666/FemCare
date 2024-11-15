import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Theme } from './theme';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

// 创建样式工具函数
export const createStyles = <T extends NamedStyles<T>>(
    styleFactory: (theme: Theme) => T
) => {
    return (theme: Theme): T => styleFactory(theme);
};

// 创建条件样式工具函数
export const createConditionalStyle = (condition: boolean, style: ViewStyle) => {
    return condition ? style : {};
};

// 合并样式工具函数
export const mergeStyles = (...styles: Array<ViewStyle | undefined>): ViewStyle => {
    return Object.assign({}, ...styles.filter(Boolean));
};

// 创建响应式样式工具函数
type Breakpoints = {
    small: number;
    medium: number;
    large: number;
};

const breakpoints: Breakpoints = {
    small: 375,
    medium: 768,
    large: 1024,
};

export const createResponsiveStyle = (
    style: ViewStyle,
    windowWidth: number
): ViewStyle => {
    if (windowWidth < breakpoints.small) {
        return {
            ...style,
            // 可以在这里添加小屏幕的特定样式
        };
    }
    if (windowWidth < breakpoints.medium) {
        return {
            ...style,
            // 可以在这里添加中等屏幕的特定样式
        };
    }
    return {
        ...style,
        // 可以在这里添加大屏幕的特定样式
    };
};
