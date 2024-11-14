import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface TypographyProps extends TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'button' | 'caption';
    color?: string;
}

export const Typography: React.FC<TypographyProps> = ({
                                                          variant = 'body1',
                                                          color,
                                                          style,
                                                          children,
                                                          ...props
                                                      }) => {
    const theme = useTheme();

    return (
        <Text
            style={[
                {
                    ...theme.typography[variant],
                    color: color || theme.colors.text.primary,
                },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};
