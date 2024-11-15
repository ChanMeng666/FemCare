// import React from 'react';
// import { View, ViewProps } from 'react-native';
// import { useTheme } from '../../hooks/useTheme';
// import {
//     createCardStyles,
//     CardElevation,
//     CardVariant,
// } from './styles/Card.styles';
//
// interface CardProps extends ViewProps {
//     elevation?: CardElevation;
//     variant?: CardVariant;
// }
//
// export const Card: React.FC<CardProps> = ({
//                                               children,
//                                               elevation = 'sm',
//                                               variant = 'filled',
//                                               style,
//                                               ...props
//                                           }) => {
//     const theme = useTheme();
//     const styles = createCardStyles(theme, { elevation, variant });
//
//     return (
//         <View style={[styles.card, style]} {...props}>
//             {children}
//         </View>
//     );
// };


import React from 'react';
import { View, ViewProps } from 'react-native';
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
    const { base, variants } = theme.components.Card;

    return (
        <View
            style={[
                base,
                variant === 'outlined' && variants.outlined,
                elevation !== 'none' && theme.shadows[elevation],
                style,
            ]}
            {...props}
        >
            {children}
        </View>
    );
};
