import { StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { Theme } from '../../../styles/theme';
import { flexMixins, spacingMixins } from '../../../styles/mixins';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const createLayoutStyles = (theme: Theme) => StyleSheet.create({
    // 基础屏幕容器
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background.default,
    },

    // 安全区域容器
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background.default,
    },

    // 滚动容器
    scrollView: {
        flexGrow: 1,
    },

    // 带内边距的滚动容器
    scrollViewWithPadding: {
        flexGrow: 1,
        ...spacingMixins.padding('md'),
    },

    // 内容区域
    content: {
        flex: 1,
        ...spacingMixins.padding('md'),
    },

    // 底部固定区域
    bottomArea: {
        ...spacingMixins.padding('md'),
        backgroundColor: theme.colors.background.paper,
        borderTopWidth: 1,
        borderTopColor: theme.colors.divider,
    },

    // 模态框容器
    modal: {
        ...flexMixins.flexCenter,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    // 模态框内容
    modalContent: {
        backgroundColor: theme.colors.background.paper,
        width: SCREEN_WIDTH - theme.spacing.xl * 2,
        borderRadius: theme.borders.radius.lg,
        ...spacingMixins.padding('lg'),
    },
});
