import { StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { Theme } from '../../../styles/theme';
import { borderMixins, spacingMixins, typographyMixins } from '../../../styles/mixins';

interface InputStyleProps {
    error?: boolean;
    isFocused: boolean;
    hasLabel?: boolean;
    disabled?: boolean;
}

export const createInputStyles = (theme: Theme, props: InputStyleProps) => {
    // 获取边框颜色
    const getBorderColor = (): string => {
        if (props.error) {
            return theme.colors.error.main;
        }
        if (props.isFocused) {
            return theme.colors.primary.main;
        }
        if (props.disabled) {
            return theme.colors.grey[300];
        }
        return theme.colors.grey[400];
    };

    // 获取背景颜色
    const getBackgroundColor = (): string => {
        if (props.disabled) {
            return theme.colors.grey[100];
        }
        return theme.colors.background.paper;
    };

    return StyleSheet.create({
        container: {
            ...spacingMixins.marginY('sm'),
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            ...borderMixins.rounded('md'),
            borderWidth: 1,
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
            minHeight: 56,
            overflow: 'hidden',
        },
        input: {
            flex: 1,
            ...spacingMixins.paddingX('md'),
            ...props.hasLabel && { paddingTop: 16 },
            color: props.disabled ? theme.colors.text.disabled : theme.colors.text.primary,
            ...Platform.select({
                ios: {
                    ...typographyMixins.body(1),
                },
                android: {
                    ...typographyMixins.body(1),
                    paddingVertical: 0,
                },
            }),
        },
        label: {
            position: 'absolute',
            left: theme.spacing.md,
            color: props.error
                ? theme.colors.error.main
                : props.isFocused
                    ? theme.colors.primary.main
                    : theme.colors.text.secondary,
        },
        adornment: {
            ...spacingMixins.paddingX('md'),
        },
        error: {
            ...typographyMixins.caption,
            color: theme.colors.error.main,
            ...spacingMixins.marginTop('xs'),
            marginLeft: theme.spacing.md,
        },
    });
};
