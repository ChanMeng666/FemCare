import { StyleSheet } from 'react-native';
import type { Theme } from '../../../styles/theme';
import type { StylesProps } from '../';

export const createCalendarStyles = (theme: Theme) => StyleSheet.create({
    // 日历卡片
    calendarCard: {
        ...spacingMixins.margin('md'),
    },

    // 记录面板
    recordPanel: {
        position: 'absolute',
        bottom: -400,
        left: 0,
        right: 0,
        height: 600,
        backgroundColor: theme.colors.background.paper,
        borderTopLeftRadius: theme.borders.radius.xl,
        borderTopRightRadius: theme.borders.radius.xl,
        ...shadowMixins.elevation('lg'),
    },

    recordHandle: {
        width: 40,
        height: 4,
        backgroundColor: theme.colors.grey[300],
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: theme.spacing.sm,
    },

    // 选择器样式
    selectorContainer: {
        ...flexMixins.flexRow,
        ...flexMixins.flexWrap,
        marginHorizontal: -theme.spacing.sm,
    },

    selectorItem: {
        ...flexMixins.flexCenter,
        padding: theme.spacing.md,
        margin: theme.spacing.sm,
        borderRadius: theme.borders.radius.lg,
        backgroundColor: theme.colors.grey[100],
    },

    selectorItemSelected: {
        backgroundColor: `${theme.colors.primary.main}20`,
    },
});
