import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { createStyles, mergeStyles } from '../../../styles/utilities';
import { flexMixins, spacingMixins, borderMixins } from '../../../styles/mixins';
import { Theme } from '../../../styles/theme';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'contained' | 'outlined' | 'text';

interface ButtonStyleProps {
    size: ButtonSize;
    variant: ButtonVariant;
    disabled?: boolean;
    fullWidth?: boolean;
}

export const createButtonStyles = (theme: Theme, props: ButtonStyleProps) => {
    // 基础样式
    const baseButton: ViewStyle = {
        ...flexMixins.flexCenter,
        ...flexMixins.flexRow,
        ...borderMixins.rounded('md'),
        minWidth: 64,
    };

    // 尺寸样式
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
        small: {
            ...spacingMixins.paddingX('sm'),
            ...spacingMixins.paddingY('xs'),
            height: 32,
        },
        medium: {
            ...spacingMixins.paddingX('md'),
            ...spacingMixins.paddingY('sm'),
            height: 40,
        },
        large: {
            ...spacingMixins.paddingX('lg'),
            ...spacingMixins.paddingY('md'),
            height: 48,
        },
    };

    // 变体样式
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
        contained: {
            backgroundColor: props.disabled
                ? theme.colors.grey[300]
                : theme.colors.primary.main,
        },
        outlined: {
            backgroundColor: 'transparent',
            borderWidth: theme.borders.width.thin,
            borderColor: props.disabled
                ? theme.colors.grey[300]
                : theme.colors.primary.main,
        },
        text: {
            backgroundColor: 'transparent',
        },
    };

    // 文字样式
    const getTextColor = (): string => {
        if (props.disabled) {
            return theme.colors.text.disabled;
        }
        switch (props.variant) {
            case 'contained':
                return theme.colors.primary.contrast;
            case 'outlined':
            case 'text':
                return theme.colors.primary.main;
            default:
                return theme.colors.primary.main;
        }
    };

    return StyleSheet.create({
        button: {
            ...baseButton,
            ...sizeStyles[props.size],
            ...variantStyles[props.variant],
            ...(props.fullWidth && { width: '100%' }),
            ...(props.disabled && { opacity: 0.6 }),
        },
        text: {
            color: getTextColor(),
            fontSize: theme.typography.sizes[props.size === 'small' ? 'sm' : props.size === 'large' ? 'lg' : 'md'],
            fontWeight: theme.typography.weights.medium,
        },
        icon: {
            marginRight: theme.spacing.xs,
        },
        loadingIndicator: {
            color: getTextColor(),
        },
    });
};
