import { ViewStyle, TextStyle, Platform } from 'react-native';
import { colors, spacing, typography, borders, shadows } from './tokens';

// Flex布局混入
export const flexMixins = {
    // 基础flex容器
    flexBase: {
        display: 'flex',
    } as ViewStyle,

    // 居中对齐
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,

    // 垂直布局
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
    } as ViewStyle,

    // 水平布局
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    } as ViewStyle,

    // 两端对齐
    flexBetween: {
        display: 'flex',
        justifyContent: 'space-between',
    } as ViewStyle,

    // Flex换行
    flexWrap: {
        display: 'flex',
        flexWrap: 'wrap',
    } as ViewStyle,
};

// 阴影混入
export const shadowMixins = {
    // 浮层阴影
    elevation: (level: 'sm' | 'md' | 'lg' = 'sm') => ({
        ...shadows[level],
    }),

    // 卡片阴影
    cardShadow: {
        ...shadows.sm,
    } as ViewStyle,

    // 模态框阴影
    modalShadow: {
        ...shadows.lg,
    } as ViewStyle,
};

// 边框混入
export const borderMixins = {
    // 圆角边框
    rounded: (size: keyof typeof borders.radius = 'md') => ({
        borderRadius: borders.radius[size],
    }),

    // 单边圆角
    roundedTop: (size: keyof typeof borders.radius = 'md') => ({
        borderTopLeftRadius: borders.radius[size],
        borderTopRightRadius: borders.radius[size],
    }),

    roundedBottom: (size: keyof typeof borders.radius = 'md') => ({
        borderBottomLeftRadius: borders.radius[size],
        borderBottomRightRadius: borders.radius[size],
    }),

    // 边框
    border: (color = colors.divider, width = borders.width.thin) => ({
        borderWidth: width,
        borderColor: color,
    }),
};

// 间距混入
export const spacingMixins = {
    // 内边距
    padding: (size: keyof typeof spacing) => ({
        padding: spacing[size],
    }),

    paddingX: (size: keyof typeof spacing) => ({
        paddingHorizontal: spacing[size],
    }),

    paddingY: (size: keyof typeof spacing) => ({
        paddingVertical: spacing[size],
    }),

    // 外边距
    margin: (size: keyof typeof spacing) => ({
        margin: spacing[size],
    }),

    marginX: (size: keyof typeof spacing) => ({
        marginHorizontal: spacing[size],
    }),

    marginY: (size: keyof typeof spacing) => ({
        marginVertical: spacing[size],
    }),

    // 间隙
    gap: (size: keyof typeof spacing) => ({
        gap: spacing[size],
    }),
};

// 文字样式混入
export const typographyMixins = {
    // 标题文字
    heading: (level: 1 | 2 | 3) => ({
        ...typography.variants[`h${level}`],
    }),

    // 正文文字
    body: (size: 1 | 2 = 1) => ({
        ...typography.variants[`body${size}`],
    }),

    // 标签文字
    caption: {
        ...typography.variants.caption,
    } as TextStyle,

    // 按钮文字
    button: {
        ...typography.variants.button,
    } as TextStyle,
};
