// import React from 'react';
// import { Switch as RNSwitch, Platform, SwitchProps as RNSwitchProps } from 'react-native';
// import { useTheme } from '../../hooks/useTheme';
// import { createSwitchStyles, SwitchSize } from './styles/Switch.styles';
//
// interface SwitchProps extends Omit<RNSwitchProps, 'trackColor' | 'thumbColor'> {
//     size?: SwitchSize;
// }
//
// export const Switch: React.FC<SwitchProps> = ({
//                                                   size = 'medium',
//                                                   value = false,
//                                                   disabled = false,
//                                                   style,
//                                                   ...props
//                                               }) => {
//     const theme = useTheme();
//     const styles = createSwitchStyles(theme, { size, disabled, value });
//
//     return (
//         <RNSwitch
//             value={value}
//             disabled={disabled}
//             trackColor={styles.colors.track}
//             thumbColor={styles.colors.thumb}
//             ios_backgroundColor={styles.colors.ios_backgroundColor}
//             style={[styles.switch, style]}
//             {...props}
//         />
//     );
// };


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
