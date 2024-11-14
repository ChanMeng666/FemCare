import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface IconButtonProps extends TouchableOpacityProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
                                                          children,
                                                          size = 'medium',
                                                          color,
                                                          style,
                                                          ...props
                                                      }) => {
    const theme = useTheme();

    const getSize = () => {
        switch (size) {
            case 'small': return 32;
            case 'large': return 48;
            default: return 40;
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    width: getSize(),
                    height: getSize(),
                    borderRadius: getSize() / 2,
                    backgroundColor: color
                        ? `${color}20`
                        : `${theme.colors.primary.main}20`,
                },
                style,
            ]}
            {...props}
        >
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
