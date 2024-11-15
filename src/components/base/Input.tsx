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
