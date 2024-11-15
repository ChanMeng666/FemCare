import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import type { Theme } from '../../../types/theme';

// Button 样式类型
export interface ButtonStyleProps {
    variant: 'contained' | 'outlined' | 'text';
    size: 'small' | 'medium' | 'large';
    disabled?: boolean;
    fullWidth?: boolean;
}

// Card 样式类型
export interface CardStyleProps {
    elevation: 'none' | 'sm' | 'md' | 'lg';
    variant: 'filled' | 'outlined';
}

// Input 样式类型
export interface InputStyleProps {
    error?: boolean;
    disabled?: boolean;
    isFocused: boolean;
    hasLabel?: boolean;
}

// Typography 样式类型
export interface TypographyStyleProps {
    variant: 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'button' | 'caption';
    color?: string;
}

// 导出所有组件样式创建函数
export { createButtonStyles } from './Button.styles';
export { createCardStyles } from './Card.styles';
export { createIconButtonStyles } from './IconButton.styles';
export { createInputStyles } from './Input.styles';
export { createSwitchStyles } from './Switch.styles';
export { createTypographyStyles } from './Typography.styles';

// 工具函数
export const createComponentStyles = <T extends Record<string, ViewStyle | TextStyle>>(
    styleFactory: (theme: Theme) => T
) => (theme: Theme) => StyleSheet.create(styleFactory(theme));
