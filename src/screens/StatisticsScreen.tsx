import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Typography } from '../components/base/Typography';
import { Card } from '../components/base/Card';
import { Button } from '../components/base/Button';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { createStatisticsStyles } from './styles';
import { createLayoutStyles, createMetricStyles, createCardStyles } from './styles/common';
import { useUsageRecords } from '../hooks/useStorage';

const TIME_RANGES = [
    { id: 'week', label: '周', days: 7 },
    { id: 'month', label: '月', days: 30 },
    { id: 'quarter', label: '季', days: 90 },
    { id: 'year', label: '年', days: 365 },
];

export default function StatisticsScreen() {
    const theme = useTheme();
    const layoutStyles = createLayoutStyles(theme);
    const metricStyles = createMetricStyles(theme);
    const cardStyles = createCardStyles(theme);
    const styles = createStatisticsStyles(theme);

    const [timeRange, setTimeRange] = useState(TIME_RANGES[1]);
    const { records } = useUsageRecords();

    return (
        <View style={layoutStyles.screen}>
            {/* 时间范围选择器 */}
            <View style={styles.timeRangeContainer}>
                {TIME_RANGES.map((range) => (
                    <Button
                        key={range.id}
                        variant={timeRange.id === range.id ? 'contained' : 'outlined'}
                        onPress={() => setTimeRange(range)}
                        size="small"
                        style={styles.timeRangeButton}
                    >
                        {range.label}
                    </Button>
                ))}
            </View>

            <ScrollView style={layoutStyles.scrollViewWithPadding}>
                {/* 指标卡片区域 */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.metricsContainer}
                >
                    <Card style={metricStyles.metricCard}>
                        <View style={metricStyles.metricHeader}>
                            <Icon
                                name="refresh"
                                size={24}
                                color={theme.colors.primary.main}
                            />
                            <Typography variant="body2" color={theme.colors.text.secondary}>
                                总更换次数
                            </Typography>
                        </View>
                        <Typography style={metricStyles.metricValue}>
                            {totalUsage}
                        </Typography>
                        <Typography style={metricStyles.metricDescription}>
                            {timeRange.label}度总计
                        </Typography>
                    </Card>

                    {/* 其他指标卡片 */}
                    <Card style={metricStyles.metricCard}>
                        <View style={metricStyles.metricHeader}>
                            <Icon
                                name="clock-outline"
                                size={24}
                                color={theme.colors.primary.main}
                            />
                            <Typography variant="body2" color={theme.colors.text.secondary}>
                                平均间隔
                            </Typography>
                        </View>
                        <Typography style={metricStyles.metricValue}>
                            {averageInterval}h
                        </Typography>
                        <Typography style={metricStyles.metricDescription}>
                            使用时长
                        </Typography>
                    </Card>

                    <Card style={metricStyles.metricCard}>
                        <View style={metricStyles.metricHeader}>
                            <Icon
                                name="chart-timeline-variant"
                                size={24}
                                color={theme.colors.primary.main}
                            />
                            <Typography variant="body2" color={theme.colors.text.secondary}>
                                平均用量
                            </Typography>
                        </View>
                        <Typography style={metricStyles.metricValue}>
                            {averageUsage}/天
                        </Typography>
                        <Typography style={metricStyles.metricDescription}>
                            {timeRange.label}平均值
                        </Typography>
                    </Card>

                    <Card style={metricStyles.metricCard}>
                        <View style={metricStyles.metricHeader}>
                            <Icon
                                name="package-variant"
                                size={24}
                                color={theme.colors.primary.main}
                            />
                            <Typography variant="body2" color={theme.colors.text.secondary}>
                                最常用产品
                            </Typography>
                        </View>
                        <Typography style={metricStyles.metricValue}>
                            {mostUsedProduct}
                        </Typography>
                        <Typography style={metricStyles.metricDescription}>
                            使用频率最高
                        </Typography>
                        {mostUsedProductTrend !== 0 && (
                            <View style={metricStyles.metricTrend}>
                                <Icon
                                    name={mostUsedProductTrend > 0 ? "trending-up" : "trending-down"}
                                    size={16}
                                    color={mostUsedProductTrend > 0
                                        ? theme.colors.success.main
                                        : theme.colors.error.main}
                                />
                                <Typography
                                    variant="caption"
                                    color={mostUsedProductTrend > 0
                                        ? theme.colors.success.main
                                        : theme.colors.error.main}
                                    style={{ marginLeft: theme.spacing.xs }}
                                >
                                    {Math.abs(mostUsedProductTrend)}% 相比上期
                                </Typography>
                            </View>
                        )}
                    </Card>

                    <Card style={metricStyles.metricCard}>
                        <View style={metricStyles.metricHeader}>
                            <Icon
                                name="calendar-check"
                                size={24}
                                color={theme.colors.primary.main}
                            />
                            <Typography variant="body2" color={theme.colors.text.secondary}>
                                记录天数
                            </Typography>
                        </View>
                        <Typography style={metricStyles.metricValue}>
                            {recordedDays}天
                        </Typography>
                        <Typography style={metricStyles.metricDescription}>
                            已记录天数
                        </Typography>
                        <View style={metricStyles.metricTrend}>
                            <Typography
                                variant="caption"
                                color={theme.colors.text.secondary}
                            >
                                记录率 {recordRate}%
                            </Typography>
                        </View>
                    </Card>

                    <Card style={metricStyles.metricCard}>
                        <View style={metricStyles.metricHeader}>
                            <Icon
                                name="timer-outline"
                                size={24}
                                color={theme.colors.primary.main}
                            />
                            <Typography variant="body2" color={theme.colors.text.secondary}>
                                超时次数
                            </Typography>
                        </View>
                        <Typography style={metricStyles.metricValue}>
                            {overtimeCount}
                        </Typography>
                        <Typography style={metricStyles.metricDescription}>
                            超过推荐时长
                        </Typography>
                        {overtimeTrend !== 0 && (
                            <View style={metricStyles.metricTrend}>
                                <Icon
                                    name={overtimeTrend < 0 ? "trending-down" : "trending-up"}
                                    size={16}
                                    color={overtimeTrend < 0
                                        ? theme.colors.success.main
                                        : theme.colors.error.main}
                                />
                                <Typography
                                    variant="caption"
                                    color={overtimeTrend < 0
                                        ? theme.colors.success.main
                                        : theme.colors.error.main}
                                    style={{ marginLeft: theme.spacing.xs }}
                                >
                                    {Math.abs(overtimeTrend)}% 相比上期
                                </Typography>
                            </View>
                        )}
                    </Card>
                </ScrollView>

                {/* 趋势图表 */}
                <Card style={styles.chartCard}>
                    <Typography variant="h3" style={cardStyles.cardHeader}>
                        使用趋势
                    </Typography>
                    <LineChart
                        data={chartData}
                        width={chartWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: theme.colors.background.paper,
                            backgroundGradientFrom: theme.colors.background.paper,
                            backgroundGradientTo: theme.colors.background.paper,
                            decimalPlaces: 0,
                            color: (opacity = 1) => theme.colors.primary.main,
                            style: styles.chart,
                        }}
                        bezier
                        style={styles.chart}
                    />
                </Card>

                {/* 分布图表 */}
                <Card style={styles.chartCard}>
                    <Typography variant="h3" style={cardStyles.cardHeader}>
                        使用时长分布
                    </Typography>
                    <View style={cardStyles.cardContent}>
                        {durationData.map((item) => (
                            <View key={item.label} style={styles.distributionItem}>
                                <View style={styles.distributionHeader}>
                                    <Typography variant="body2">
                                        {item.label}
                                    </Typography>
                                    <Typography variant="body2" color={theme.colors.text.secondary}>
                                        {item.value}%
                                    </Typography>
                                </View>
                                <View style={styles.distributionBar}>
                                    <View
                                        style={[
                                            styles.distributionProgress,
                                            {
                                                backgroundColor: item.color,
                                                width: `${item.value}%`,
                                            },
                                        ]}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* 饼图 */}
                <Card style={styles.chartCard}>
                    <Typography variant="h3" style={cardStyles.cardHeader}>
                        产品使用分布
                    </Typography>
                    <PieChart
                        data={productDistribution}
                        width={chartWidth}
                        height={220}
                        chartConfig={{
                            color: (opacity = 1) => theme.colors.primary.main,
                            labelColor: (opacity = 1) => theme.colors.text.primary,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                </Card>
            </ScrollView>
        </View>
    );
}
