import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    TouchableOpacityProps,
    View,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'contained' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'contained',
                                                  size = 'medium',
                                                  loading = false,
                                                  disabled = false,
                                                  startIcon,
                                                  endIcon,
                                                  style,
                                                  ...props
                                              }) => {
    const theme = useTheme();
    const { base, sizes, variants } = theme.components.Button;

    return (
        <TouchableOpacity
            style={[
                base,
                sizes[size],
                variants[variant],
                disabled && { opacity: 0.6 },
                style,
            ]}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={variants[variant].color}
                    size={size === 'small' ? 'small' : 'large'}
                />
            ) : (
                <>
                    {startIcon && <View style={{ marginRight: theme.spacing.xs }}>{startIcon}</View>}
                    <Text style={{ color: variants[variant].color }}>
                        {children}
                    </Text>
                    {endIcon && <View style={{ marginLeft: theme.spacing.xs }}>{endIcon}</View>}
                </>
            )}
        </TouchableOpacity>
    );
};
