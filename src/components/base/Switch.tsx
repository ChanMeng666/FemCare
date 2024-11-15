import React from 'react';
import { Switch as RNSwitch, Platform, SwitchProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface CustomSwitchProps extends Omit<SwitchProps, 'trackColor' | 'thumbColor'> {
    size?: 'small' | 'medium' | 'large';
}

export const Switch: React.FC<CustomSwitchProps> = ({
                                                        size = 'medium',
                                                        value,
                                                        disabled,
                                                        style,
                                                        ...props
                                                    }) => {
    const theme = useTheme();

    const getScale = () => {
        switch (size) {
            case 'small': return 0.8;
            case 'large': return 1.2;
            default: return 1;
        }
    };

    return (
        <RNSwitch
            value={value}
            disabled={disabled}
            trackColor={{
                false: theme.colors.grey[300],
                true: theme.colors.primary.main,
            }}
            thumbColor={Platform.OS === 'ios'
                ? '#FFFFFF'
                : value
                    ? theme.colors.primary.main
                    : theme.colors.grey[100]
            }
            style={[
                {
                    transform: [{ scale: getScale() }],
                    opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
            {...props}
        />
    );
};
