import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps,
    ActivityIndicator, View,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'contained' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'contained',
                                                  size = 'medium',
                                                  loading,
                                                  disabled,
                                                  startIcon,
                                                  endIcon,
                                                  style,
                                                  ...props
                                              }) => {
    const theme = useTheme();

    const getBackgroundColor = () => {
        if (disabled) return theme.colors.text.disabled;
        if (variant === 'contained') return theme.colors.primary.main;
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return theme.colors.background.paper;
        if (variant === 'contained') return theme.colors.primary.contrast;
        return theme.colors.primary.main;
    };

    const getPadding = () => {
        switch (size) {
            case 'small': return 8;
            case 'large': return 16;
            default: return 12;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    padding: getPadding(),
                    borderRadius: theme.borderRadius.md,
                    ...(variant === 'outlined' && {
                        borderWidth: 1,
                        borderColor: disabled
                            ? theme.colors.text.disabled
                            : theme.colors.primary.main,
                    }),
                },
                style,
            ]}
            disabled={disabled || loading}
            {...props}
        >
            {startIcon && !loading && (
                <View style={styles.iconStart}>{startIcon}</View>
            )}

            {loading ? (
                <ActivityIndicator
                    color={getTextColor()}
                    size={size === 'small' ? 'small' : 'large'}
                />
            ) : (
                <Text
                    style={[
                        styles.text,
                        {
                            color: getTextColor(),
                            fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
                            fontWeight: '500',
                        },
                    ]}
                >
                    {children}
                </Text>
            )}

            {endIcon && !loading && (
                <View style={styles.iconEnd}>{endIcon}</View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 64,
    },
    text: {
        textAlign: 'center',
    },
    iconStart: {
        marginRight: 8,
    },
    iconEnd: {
        marginLeft: 8,
    },
});
