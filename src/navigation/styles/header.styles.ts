import { Platform } from 'react-native';
import { Theme } from '../../styles/theme';
import { flexMixins, shadowMixins } from '../../styles/mixins';

export const createHeaderStyles = (theme: Theme) => ({
    // 标题栏基础样式
    header: {
        backgroundColor: theme.colors.background.paper,
        height: Platform.OS === 'ios' ? 44 : 56,
        ...Platform.select({
            ios: shadowMixins.elevation('sm'),
            android: {
                elevation: 4,
            },
        }),
    },

    // 标题文本样式
    title: {
        color: theme.colors.text.primary,
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.semibold,
    },

    // 返回按钮样式
    backButton: {
        ...flexMixins.flexCenter,
        width: 44,
        height: 44,
    },

    // 标题栏图标样式
    headerIcon: {
        color: theme.colors.primary.main,
        size: 24,
    },

    // 标题栏按钮样式
    headerButton: {
        paddingHorizontal: theme.spacing.sm,
    },
});
