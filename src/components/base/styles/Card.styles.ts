import { StyleSheet, ViewStyle } from 'react-native';
import { createStyles } from '../../../styles/utilities';
import { shadowMixins, borderMixins, spacingMixins } from '../../../styles/mixins';
import { Theme } from '../../../styles/theme';

export type CardElevation = 'none' | 'sm' | 'md' | 'lg';
export type CardVariant = 'filled' | 'outlined';

interface CardStyleProps {
    elevation: CardElevation;
    variant: CardVariant;
}

export const createCardStyles = (theme: Theme, props: CardStyleProps) => {
    const baseCard: ViewStyle = {
        backgroundColor: theme.colors.background.paper,
        ...borderMixins.rounded('lg'),
        ...spacingMixins.padding('md'),
        ...spacingMixins.margin('sm'),
    };

    // 阴影样式
    const elevationStyles: Record<CardElevation, ViewStyle> = {
        none: {},
        sm: shadowMixins.elevation('sm'),
        md: shadowMixins.elevation('md'),
        lg: shadowMixins.elevation('lg'),
    };

    // 变体样式
    const variantStyles: Record<CardVariant, ViewStyle> = {
        filled: {},
        outlined: {
            ...borderMixins.border(theme.colors.divider),
        },
    };

    return StyleSheet.create({
        card: {
            ...baseCard,
            ...elevationStyles[props.elevation],
            ...variantStyles[props.variant],
        },
    });
};
