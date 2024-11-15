import { Theme } from '../../styles/theme';

export const createScreenStyles = (theme: Theme) => ({
    // 屏幕基础样式
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background.default,
    },

    // 模态屏幕样式
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },

    // 过渡动画配置
    transition: {
        fade: {
            opacity: {
                interpolation: 'linear',
            },
        },
        slide: {
            translateY: {
                interpolation: 'linear',
                inputRange: [0, 1],
                outputRange: [theme.spacing.xl, 0],
            },
        },
    },
});
