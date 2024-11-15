import { StyleSheet, ViewStyle } from 'react-native';
import { createStyles, createConditionalStyle } from '../../../styles/utilities';
import { flexMixins, borderMixins } from '../../../styles/mixins';
import { Theme } from '../../../styles/theme';

export type IconButtonSize = 'small' | 'medium' | 'large';

interface IconButtonStyleProps {
    size: IconButtonSize;
    color?: string;
    disabled?: boolean;
}

export const createIconButtonStyles = (theme: Theme, props: IconButtonStyleProps) => {
    // 获取按钮尺寸
    const getButtonSize = (): number => {
        switch (props.size) {
            case 'small':
                return 32;
            case 'large':
                return 48;
            default:
                return 40;
        }
    };

    // 获取背景色
    const getBackgroundColor = (): string => {
        if (props.disabled) {
            return theme.colors.grey[200];
        }
        const baseColor = props.color || theme.colors.primary.main;
        return `${baseColor}20`; // 20% opacity
    };

    const buttonSize = getButtonSize();

    return StyleSheet.create({
        button: {
            ...flexMixins.flexCenter,
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
            backgroundColor: getBackgroundColor(),
            opacity: props.disabled ? 0.6 : 1,
        },
        ripple: {
            color: props.color || theme.colors.primary.main,
        },
    });
};
