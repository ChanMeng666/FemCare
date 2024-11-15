import React from 'react';
import {
    TouchableOpacity,
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

    const getSize = (): number => {
        switch (size) {
            case 'small': return 32;
            case 'large': return 48;
            default: return 40;
        }
    };

    const baseStyle = {
        width: getSize(),
        height: getSize(),
        borderRadius: getSize() / 2,
        backgroundColor: color
            ? `${color}20`
            : `${theme.colors.primary.main}20`,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    };

    return (
        <TouchableOpacity
            style={[baseStyle, style]}
            {...props}
        >
            {children}
        </TouchableOpacity>
    );
};
