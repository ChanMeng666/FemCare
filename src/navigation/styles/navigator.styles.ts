import { Theme } from '../../styles/theme';
import { Platform } from 'react-native';

export const createNavigatorStyles = (theme: Theme) => ({
    // 全局导航器样式
    navigator: {
        backgroundColor: theme.colors.background.default,
    },

    // 全局卡片样式
    cardStyle: {
        backgroundColor: theme.colors.background.default,
    },

    // 屏幕过渡配置
    screenOptions: {
        gestureEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
                opacity: progress,
            },
        }),
    },
});
