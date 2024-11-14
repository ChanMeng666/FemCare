import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
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
                                                ...props
                                            }) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = React.useState(false);
    const animatedLabelPosition = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(animatedLabelPosition, {
            toValue: isFocused || props.value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, props.value]);

    const labelStyle = {
        position: 'absolute',
        left: startAdornment ? 36 : 12,
        top: animatedLabelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [18, 8],
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
    };

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
            )}

            <View style={[
                styles.inputContainer,
                {
                    borderColor: error
                        ? theme.colors.error.main
                        : isFocused
                            ? theme.colors.primary.main
                            : theme.colors.divider,
                },
            ]}>
                {startAdornment && (
                    <View style={styles.adornment}>
                        {startAdornment}
                    </View>
                )}

                <TextInput
                    style={[
                        styles.input,
                        {
                            color: theme.colors.text.primary,
                            paddingTop: label ? 16 : 0,
                        },
                    ]}
                    placeholderTextColor={theme.colors.text.disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {endAdornment && (
                    <View style={styles.adornment}>
                        {endAdornment}
                    </View>
                )}
            </View>

            {error && (
                <Text style={[styles.error, { color: theme.colors.error.main }]}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 56,
        backgroundColor: 'transparent',
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    adornment: {
        paddingHorizontal: 12,
    },
    error: {
        marginTop: 4,
        fontSize: 12,
        marginLeft: 12,
    },
});
