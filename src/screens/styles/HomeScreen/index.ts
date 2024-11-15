import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';
import { flexMixins, spacingMixins } from '../../../styles/mixins';
import type { StylesProps } from '../';

export const createHomeStyles = (theme: Theme) => StyleSheet.create({
    // 状态卡片
    statusCard: {
        ...spacingMixins.marginBottom('md'),
    },

    statusInfo: {
        ...flexMixins.flexRow,
        alignItems: 'center',
        ...spacingMixins.marginTop('sm'),
    },

    statusText: {
        marginLeft: theme.spacing.md,
    },

    warningText: {
        ...spacingMixins.marginTop('sm'),
        color: theme.colors.error.main,
    },

    // 快速操作面板
    quickActionOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },

    quickActionPanel: {
        backgroundColor: theme.colors.background.paper,
        borderTopLeftRadius: theme.borders.radius.xl,
        borderTopRightRadius: theme.borders.radius.xl,
        ...spacingMixins.padding('lg'),
    },

    // 产品网格
    productGrid: {
        ...flexMixins.flexRow,
        ...flexMixins.flexWrap,
        justifyContent: 'space-between',
        marginHorizontal: -theme.spacing.sm,
    },

    productItem: {
        width: '45%',
        aspectRatio: 1,
        ...flexMixins.flexCenter,
        backgroundColor: theme.colors.grey[100],
        borderRadius: theme.borders.radius.lg,
        margin: theme.spacing.sm,
    },

    // 成功提示
    successToast: {
        position: 'absolute',
        bottom: theme.spacing.xl,
        left: theme.spacing.lg,
        right: theme.spacing.lg,
        ...flexMixins.flexRow,
        ...flexMixins.flexCenter,
        backgroundColor: theme.colors.success.main,
        borderRadius: theme.borders.radius.md,
        ...spacingMixins.padding('md'),
    },
});
