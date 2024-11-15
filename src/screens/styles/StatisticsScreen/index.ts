import { StyleSheet } from 'react-native';
import type { Theme } from '../../../styles/theme';
import type { StylesProps } from '../';
import { flexMixins, spacingMixins } from '../../../styles/mixins';

export const createStatisticsStyles = (theme: Theme) => StyleSheet.create({
    // 时间范围选择器
    timeRangeContainer: {
        ...flexMixins.flexRow,
        justifyContent: 'space-around',
        ...spacingMixins.padding('md'),
    },

    // 图表卡片
    chartCard: {
        ...spacingMixins.margin('md'),
    },

    chart: {
        marginVertical: theme.spacing.sm,
        borderRadius: theme.borders.radius.lg,
    },

    // 分布条
    distributionBar: {
        height: 8,
        backgroundColor: theme.colors.grey[100],
        borderRadius: theme.borders.radius.sm,
        overflow: 'hidden',
    },

    distributionProgress: {
        height: '100%',
        borderRadius: theme.borders.radius.sm,
    },
});
