import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface CardProps extends ViewProps {
    elevation?: 'none' | 'sm' | 'md' | 'lg';
    variant?: 'filled' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
                                              children,
                                              elevation = 'sm',
                                              variant = 'filled',
                                              style,
                                              ...props
                                          }) => {
    const theme = useTheme();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: theme.colors.background.paper,
                    borderRadius: theme.borderRadius.lg,
                    ...(elevation !== 'none' && {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: elevation === 'sm' ? 2 : elevation === 'md' ? 4 : 8,
                    }),
                    ...(variant === 'outlined' && {
                        borderWidth: 1,
                        borderColor: theme.colors.divider,
                    }),
                },
                style,
            ]}
            {...props}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        margin: 8,
    },
});
