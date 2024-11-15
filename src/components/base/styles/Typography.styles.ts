import { createStyles } from '../../../styles/utilities';
import { typographyMixins } from '../../../styles/mixins';
import { Theme } from '../../../styles/theme';
import { TextStyle } from 'react-native';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'button' | 'caption';

// 创建样式生成函数
export const createTypographyStyles = (theme: Theme, variant: TypographyVariant, color?: string) => {
    const baseStyle: TextStyle = {
        color: color || theme.colors.text.primary,
    };

    switch (variant) {
        case 'h1':
            return {
                ...baseStyle,
                ...typographyMixins.heading(1),
            };
        case 'h2':
            return {
                ...baseStyle,
                ...typographyMixins.heading(2),
            };
        case 'h3':
            return {
                ...baseStyle,
                ...typographyMixins.heading(3),
            };
        case 'body1':
            return {
                ...baseStyle,
                ...typographyMixins.body(1),
            };
        case 'body2':
            return {
                ...baseStyle,
                ...typographyMixins.body(2),
            };
        case 'button':
            return {
                ...baseStyle,
                ...typographyMixins.button,
            };
        case 'caption':
            return {
                ...baseStyle,
                ...typographyMixins.caption,
            };
        default:
            return {
                ...baseStyle,
                ...typographyMixins.body(1),
            };
    }
};
