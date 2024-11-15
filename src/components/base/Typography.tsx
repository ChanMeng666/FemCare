import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'button' | 'caption';

interface TypographyProps extends TextProps {
    variant?: TypographyVariant;
    color?: string;
    children: React.ReactNode;
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
                theme.typography.variants[variant],
                { color: color || theme.colors.text.primary },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};
