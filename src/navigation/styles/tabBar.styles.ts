import { Theme } from '../../styles/theme';
import { Platform } from 'react-native';
import { flexMixins, shadowMixins } from '../../styles/mixins';

export const createTabBarStyles = (theme: Theme) => ({
    // 底部标签栏容器
    tabBar: {
        backgroundColor: theme.colors.background.paper,
        height: Platform.OS === 'ios' ? 84 : 64,
        paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        ...Platform.select({
            ios: shadowMixins.elevation('sm'),
            android: {
                elevation: 8,
            },
        }),
        borderTopWidth: 1,
        borderTopColor: theme.colors.divider,
    },

    // 标签项容器
    tabItem: {
        ...flexMixins.flexCenter,
        paddingVertical: theme.spacing.xs,
    },

    // 标签图标
    icon: {
        marginBottom: Platform.OS === 'ios' ? 2 : 4,
    },

    // 标签文本
    label: {
        fontSize: theme.typography.sizes.xs,
        fontWeight: theme.typography.weights.medium,
    },

    // 活跃状态样式
    active: {
        color: theme.colors.primary.main,
    },

    // 非活跃状态样式
    inactive: {
        color: theme.colors.text.secondary,
    },
});
