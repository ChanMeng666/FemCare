import React from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps, Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface SwitchProps extends RNSwitchProps {
    size?: 'small' | 'medium' | 'large';
}

export const Switch: React.FC<SwitchProps> = ({
                                                  size = 'medium',
                                                  value,
                                                  onValueChange,
                                                  disabled,
                                                  style,
                                                  ...props
                                              }) => {
    const theme = useTheme();

    // Get track color based on platform
    const getTrackColor = () => {
        if (Platform.OS === 'ios') {
            return {
                false: theme.colors.text.disabled,
                true: theme.colors.primary.main,
            };
        }
        return {
            false: `${theme.colors.text.disabled}50`,
            true: `${theme.colors.primary.main}50`,
        };
    };

    // Get thumb color based on platform and state
    const getThumbColor = () => {
        if (Platform.OS === 'ios') {
            return '#FFFFFF';
        }

        if (disabled) {
            return theme.colors.text.disabled;
        }

        return value
            ? theme.colors.primary.main
            : theme.colors.text.secondary;
    };

    // Get dimensions based on size
    const getDimensions = () => {
        switch (size) {
            case 'small':
                return {
                    transform: [{ scale: 0.8 }],
                };
            case 'large':
                return {
                    transform: [{ scale: 1.2 }],
                };
            default:
                return {};
        }
    };

    return (
        <RNSwitch
            value={value}
            onValueChange={onValueChange}
            disabled={disabled}
            trackColor={getTrackColor()}
            thumbColor={getThumbColor()}
            ios_backgroundColor={theme.colors.text.disabled}
            style={[
                styles.switch,
                getDimensions(),
                style,
            ]}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    switch: {
        marginVertical: 4,
    },
});
