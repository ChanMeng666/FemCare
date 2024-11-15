import { StyleSheet, Platform } from 'react-native';
import { Theme } from '../../../styles/theme';

export type SwitchSize = 'small' | 'medium' | 'large';

interface SwitchStyleProps {
    size: SwitchSize;
    disabled?: boolean;
    value: boolean;
}

export const createSwitchStyles = (theme: Theme, props: SwitchStyleProps) => {
    // 获取轨道颜色
    const getTrackColor = () => {
        if (Platform.OS === 'ios') {
            return {
                false: theme.colors.grey[300],
                true: theme.colors.primary.main,
            };
        }
        return {
            false: `${theme.colors.grey[300]}50`,
            true: `${theme.colors.primary.main}50`,
        };
    };

    // 获取开关颜色
    const getThumbColor = () => {
        if (Platform.OS === 'ios') {
            return '#FFFFFF';
        }

        if (props.disabled) {
            return theme.colors.grey[400];
        }

        return props.value
            ? theme.colors.primary.main
            : theme.colors.grey[500];
    };

    // 获取尺寸
    const getScale = () => {
        switch (props.size) {
            case 'small':
                return 0.8;
            case 'large':
                return 1.2;
            default:
                return 1;
        }
    };

    return StyleSheet.create({
        switch: {
            transform: [{ scale: getScale() }],
            opacity: props.disabled ? 0.5 : 1,
            margin: theme.spacing.xs,
        },
        colors: {
            track: getTrackColor(),
            thumb: getThumbColor(),
            ios_backgroundColor: theme.colors.grey[300],
        },
    });
};
