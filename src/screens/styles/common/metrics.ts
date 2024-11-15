import {Dimensions, StyleSheet} from 'react-native';
import { Theme } from '../../../styles/theme';
import {flexMixins, spacingMixins, typographyMixins} from '../../../styles/mixins';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const createMetricStyles = (theme: Theme) => StyleSheet.create({
    // 指标卡片
    metricCard: {
        width: SCREEN_WIDTH * 0.4,
        ...spacingMixins.margin('sm'),
        ...spacingMixins.padding('md'),
        backgroundColor: theme.colors.background.paper,
        borderRadius: theme.borders.radius.lg,
    },

    // 指标标题
    metricHeader: {
        ...flexMixins.flexRow,
        alignItems: 'center',
        ...spacingMixins.marginBottom('sm'),
    },

    // 指标数值
    metricValue: {
        ...typographyMixins.heading(2),
        color: theme.colors.primary.main,
        ...spacingMixins.marginY('xs'),
    },

    // 指标描述
    metricDescription: {
        color: theme.colors.text.secondary,
        ...typographyMixins.caption,
    },

    // 指标趋势
    metricTrend: {
        ...flexMixins.flexRow,
        alignItems: 'center',
        ...spacingMixins.marginTop('sm'),
    },
});
