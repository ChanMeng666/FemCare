// import React, { useState, useRef, useEffect } from 'react';
// import {
//     View,
//     TextInput,
//     Text,
//     TextInputProps,
//     Animated,
//     Platform,
// } from 'react-native';
// import { useTheme } from '../../hooks/useTheme';
// import { createInputStyles } from './styles/Input.styles';
//
// interface InputProps extends TextInputProps {
//     label?: string;
//     error?: string;
//     startAdornment?: React.ReactNode;
//     endAdornment?: React.ReactNode;
//     disabled?: boolean;
// }
//
// export const Input: React.FC<InputProps> = ({
//                                                 label,
//                                                 error,
//                                                 startAdornment,
//                                                 endAdornment,
//                                                 style,
//                                                 disabled,
//                                                 value,
//                                                 onFocus,
//                                                 onBlur,
//                                                 ...props
//                                             }) => {
//     const theme = useTheme();
//     const [isFocused, setIsFocused] = useState(false);
//     const animatedLabelPosition = useRef(new Animated.Value(0)).current;
//     const animatedLabelSize = useRef(new Animated.Value(0)).current;
//
//     const styles = createInputStyles(theme, {
//         error: !!error,
//         isFocused,
//         hasLabel: !!label,
//         disabled,
//     });
//
//     useEffect(() => {
//         Animated.parallel([
//             Animated.timing(animatedLabelPosition, {
//                 toValue: isFocused || value ? 1 : 0,
//                 duration: 200,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(animatedLabelSize, {
//                 toValue: isFocused || value ? 1 : 0,
//                 duration: 200,
//                 useNativeDriver: false,
//             }),
//         ]).start();
//     }, [isFocused, value]);
//
//     const labelStyle = {
//         ...styles.label,
//         top: animatedLabelPosition.interpolate({
//             inputRange: [0, 1],
//             outputRange: [16, 8],
//         }),
//         fontSize: animatedLabelSize.interpolate({
//             inputRange: [0, 1],
//             outputRange: [16, 12],
//         }),
//     };
//
//     const handleFocus = (e: any) => {
//         setIsFocused(true);
//         onFocus?.(e);
//     };
//
//     const handleBlur = (e: any) => {
//         setIsFocused(false);
//         onBlur?.(e);
//     };
//
//     return (
//         <View style={styles.container}>
//             <View style={styles.inputContainer}>
//                 {startAdornment && (
//                     <View style={styles.adornment}>
//                         {startAdornment}
//                     </View>
//                 )}
//
//                 <View style={{ flex: 1 }}>
//                     {label && (
//                         <Animated.Text style={labelStyle}>
//                             {label}
//                         </Animated.Text>
//                     )}
//
//                     <TextInput
//                         style={[styles.input, style]}
//                         onFocus={handleFocus}
//                         onBlur={handleBlur}
//                         value={value}
//                         editable={!disabled}
//                         placeholderTextColor={theme.colors.text.disabled}
//                         {...props}
//                     />
//                 </View>
//
//                 {endAdornment && (
//                     <View style={styles.adornment}>
//                         {endAdornment}
//                     </View>
//                 )}
//             </View>
//
//             {error && (
//                 <Text style={styles.error}>
//                     {error}
//                 </Text>
//             )}
//         </View>
//     );
// };


import React, { useState, useRef } from 'react';
import {
    View,
    TextInput,
    Text,
    TextInputProps,
    Animated,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
                                                label,
                                                error,
                                                startAdornment,
                                                endAdornment,
                                                style,
                                                onFocus,
                                                onBlur,
                                                ...props
                                            }) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabelPosition = useRef(new Animated.Value(0)).current;
    const { base, states } = theme.components.Input;

    const handleFocus = (e: any) => {
        setIsFocused(true);
        Animated.timing(animatedLabelPosition, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        if (!props.value) {
            Animated.timing(animatedLabelPosition, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
        onBlur?.(e);
    };

    const inputState = error
        ? states.error
        : isFocused
            ? states.focused
            : props.disabled
                ? states.disabled
                : base;

    return (
        <View>
            <View style={[inputState, style]}>
                {startAdornment && (
                    <View style={{ marginRight: theme.spacing.sm }}>
                        {startAdornment}
                    </View>
                )}

                <View style={{ flex: 1 }}>
                    {label && (
                        <Animated.Text
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: animatedLabelPosition.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [12, 0],
                                }),
                                fontSize: animatedLabelPosition.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [16, 12],
                                }),
                                color: error
                                    ? theme.colors.error.main
                                    : isFocused
                                        ? theme.colors.primary.main
                                        : theme.colors.text.secondary,
                            }}
                        >
                            {label}
                        </Animated.Text>
                    )}
                    <TextInput
                        style={{
                            color: theme.colors.text.primary,
                            paddingTop: label ? 16 : 0,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...props}
                    />
                </View>

                {endAdornment && (
                    <View style={{ marginLeft: theme.spacing.sm }}>
                        {endAdornment}
                    </View>
                )}
            </View>

            {error && (
                <Text
                    style={{
                        color: theme.colors.error.main,
                        fontSize: theme.typography.sizes.xs,
                        marginTop: theme.spacing.xs,
                        marginLeft: theme.spacing.sm,
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    );
};
