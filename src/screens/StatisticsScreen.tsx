// import React, { useState, useCallback, useMemo } from 'react';
// import { View, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
// import { Card } from '../components/base/Card';
// import { Typography } from '../components/base/Typography';
// import { Button } from '../components/base/Button';
// import { useTheme } from '../hooks/useTheme';
// import { useUsageRecords } from '../hooks/useStorage';
// import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';
// import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import { ProductType } from '../types';
// import Animated, {
//     useAnimatedStyle,
//     withSpring,
//     useSharedValue,
//     withTiming,
// } from 'react-native-reanimated';
//
// const { width: SCREEN_WIDTH } = Dimensions.get('window');
//
// const TIME_RANGES = [
//     { id: 'week', label: '周', days: 7 },
//     { id: 'month', label: '月', days: 30 },
//     { id: 'quarter', label: '季', days: 90 },
//     { id: 'year', label: '年', days: 365 },
// ];
//
// type MetricCardProps = {
//     title: string;
//     value: string;
//     subtitle: string;
//     icon: string;
//     trend?: number;
//     trendLabel?: string;
// };
//
// const MetricCard: React.FC<MetricCardProps> = ({
//                                                    title,
//                                                    value,
//                                                    subtitle,
//                                                    icon,
//                                                    trend,
//                                                    trendLabel,
//                                                }) => {
//     const theme = useTheme();
//     const trendColor = trend
//         ? trend > 0
//             ? theme.colors.success.main
//             : theme.colors.error.main
//         : undefined;
//
//     return (
//         <Card elevation="sm" style={styles.metricCard}>
//             <View style={styles.metricHeader}>
//                 <Icon name={icon} size={24} color={theme.colors.primary.main} />
//                 <Typography variant="body2" color={theme.colors.text.secondary}>
//                     {title}
//                 </Typography>
//             </View>
//             <Typography variant="h2" style={styles.metricValue}>
//                 {value}
//             </Typography>
//             <Typography variant="caption" color={theme.colors.text.secondary}>
//                 {subtitle}
//             </Typography>
//             {trend && (
//                 <View style={styles.trendContainer}>
//                     <Icon
//                         name={trend > 0 ? 'trending-up' : 'trending-down'}
//                         size={16}
//                         color={trendColor}
//                     />
//                     <Typography
//                         variant="caption"
//                         style={styles.trendValue}
//                         color={trendColor}
//                     >
//                         {Math.abs(trend)}% {trendLabel}
//                     </Typography>
//                 </View>
//             )}
//         </Card>
//     );
// };
//
// export default function StatisticsScreen() {
//     const theme = useTheme();
//     const { records } = useUsageRecords();
//     const [timeRange, setTimeRange] = useState(TIME_RANGES[1]);
//
//     // 处理数据
//     const {
//         usageData,
//         productDistribution,
//         averageInterval,
//         totalUsage,
//         usageComparison,
//     } = useMemo(() => {
//         const endDate = new Date();
//         const startDate = subDays(endDate, timeRange.days);
//         const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
//
//         const usage = dateRange.map(date => {
//             const dayRecords = records.filter(r => isSameDay(new Date(r.timestamp), date));
//             return {
//                 date: format(date, 'MM-dd'),
//                 count: dayRecords.length,
//             };
//         });
//
//         const distribution = records.reduce((acc: any, record) => {
//             acc[record.productType] = (acc[record.productType] || 0) + 1;
//             return acc;
//         }, {});
//
//         let totalInterval = 0;
//         let intervalCount = 0;
//         for (let i = 1; i < records.length; i++) {
//             const interval = (records[i].timestamp - records[i - 1].timestamp) / (1000 * 60 * 60);
//             totalInterval += interval;
//             intervalCount++;
//         }
//
//         const prevPeriodUsage = records.filter(r =>
//             r.timestamp >= subDays(startDate, timeRange.days).getTime() &&
//             r.timestamp < startDate.getTime()
//         ).length;
//
//         const currentPeriodUsage = records.filter(r =>
//             r.timestamp >= startDate.getTime()
//         ).length;
//
//         const usageChange = prevPeriodUsage
//             ? ((currentPeriodUsage - prevPeriodUsage) / prevPeriodUsage) * 100
//             : 0;
//
//         return {
//             usageData: usage,
//             productDistribution: Object.entries(distribution).map(([key, value]) => ({
//                 name: key,
//                 population: value,
//                 color: theme.colors.primary.main,
//                 legendFontColor: theme.colors.text.primary,
//             })),
//             averageInterval: intervalCount ? Math.round(totalInterval / intervalCount) : 0,
//             totalUsage: currentPeriodUsage,
//             usageComparison: usageChange,
//         };
//     }, [records, timeRange, theme]);
//
//     // 渲染时间范围选择器
//     const renderTimeRangeSelector = () => (
//         <View style={styles.timeRangeContainer}>
//             {TIME_RANGES.map((range) => (
//                 <Button
//                     key={range.id}
//                     variant={timeRange.id === range.id ? 'contained' : 'outlined'}
//                     onPress={() => setTimeRange(range)}
//                     style={styles.timeRangeButton}
//                 >
//                     {range.label}
//                 </Button>
//             ))}
//         </View>
//     );
//
//     // 渲染指标卡片
//     const renderMetrics = () => (
//         <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.metricsContainer}
//         >
//             <MetricCard
//                 title="总更换次数"
//                 value={totalUsage.toString()}
//                 subtitle={`${timeRange.label}度总计`}
//                 icon="refresh"
//                 trend={usageComparison}
//                 trendLabel="相比上期"
//             />
//             <MetricCard
//                 title="平均间隔"
//                 value={`${averageInterval}h`}
//                 subtitle="使用时长"
//                 icon="clock-outline"
//             />
//             <MetricCard
//                 title="最常用产品"
//                 value={productDistribution[0]?.name || '-'}
//                 subtitle="使用频率最高"
//                 icon="package-variant"
//             />
//         </ScrollView>
//     );
//
//     const renderLineChart = () => (
//         <Card elevation="sm" style={styles.chartCard}>
//             <Typography variant="h3" style={styles.chartTitle}>
//                 使用趋势
//             </Typography>
//             <LineChart
//                 data={{
//                     labels: usageData.map(d => d.date),
//                     datasets: [{
//                         data: usageData.map(d => d.count)
//                     }]
//                 }}
//                 width={SCREEN_WIDTH - 48}
//                 height={220}
//                 chartConfig={{
//                     backgroundColor: theme.colors.background.paper,
//                     backgroundGradientFrom: theme.colors.background.paper,
//                     backgroundGradientTo: theme.colors.background.paper,
//                     decimalPlaces: 0,
//                     color: (opacity = 1) => theme.colors.primary.main,
//                     labelColor: (opacity = 1) => theme.colors.text.secondary,
//                     style: {
//                         borderRadius: 16
//                     },
//                     propsForDots: {
//                         r: "6",
//                         strokeWidth: "2",
//                         stroke: theme.colors.primary.main
//                     }
//                 }}
//                 bezier
//                 style={styles.chart}
//             />
//         </Card>
//     );
//
//     const renderPieChart = () => (
//         <Card elevation="sm" style={styles.chartCard}>
//             <Typography variant="h3" style={styles.chartTitle}>
//                 产品使用分布
//             </Typography>
//             <PieChart
//                 data={productDistribution}
//                 width={SCREEN_WIDTH - 48}
//                 height={220}
//                 chartConfig={{
//                     color: (opacity = 1) => theme.colors.primary.main,
//                     labelColor: (opacity = 1) => theme.colors.text.primary
//                 }}
//                 accessor="population"
//                 backgroundColor="transparent"
//                 paddingLeft="15"
//                 absolute
//             />
//         </Card>
//     );
//
//     // 渲染使用时长分布
//     const renderDurationDistribution = () => (
//         <Card elevation="sm" style={styles.chartCard}>
//             <Typography variant="h3" style={styles.chartTitle}>
//                 使用时长分布
//             </Typography>
//             <View style={styles.durationContainer}>
//                 {[
//                     { label: '4小时以内', value: 30, color: theme.colors.success.main },
//                     { label: '4-6小时', value: 45, color: theme.colors.primary.main },
//                     { label: '6小时以上', value: 25, color: theme.colors.error.main },
//                 ].map((item) => (
//                     <View key={item.label} style={styles.durationItem}>
//                         <View style={styles.durationHeader}>
//                             <Typography variant="body2">{item.label}</Typography>
//                             <Typography
//                                 variant="body2"
//                                 color={theme.colors.text.secondary}
//                             >
//                                 {item.value}%
//                             </Typography>
//                         </View>
//                         <View style={styles.durationBar}>
//                             <View
//                                 style={[
//                                     styles.durationProgress,
//                                     {
//                                         backgroundColor: item.color,
//                                         width: `${item.value}%`,
//                                     },
//                                 ]}
//                             />
//                         </View>
//                     </View>
//                 ))}
//             </View>
//         </Card>
//     );
//
//     return (
//         <ScrollView
//             style={[
//                 styles.container,
//                 { backgroundColor: theme.colors.background.default },
//             ]}
//         >
//             {renderTimeRangeSelector()}
//             {renderMetrics()}
//             {renderLineChart()}
//             {renderPieChart()}
//             {renderDurationDistribution()}
//         </ScrollView>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     timeRangeContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         padding: 16,
//     },
//     timeRangeButton: {
//         minWidth: 80,
//     },
//     metricsContainer: {
//         paddingHorizontal: 16,
//         marginBottom: 16,
//     },
//     metricCard: {
//         width: SCREEN_WIDTH * 0.4,
//         marginRight: 12,
//         padding: 16,
//     },
//     metricHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     metricValue: {
//         marginVertical: 4,
//     },
//     trendContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 8,
//     },
//     trendValue: {
//         marginLeft: 4,
//     },
//     chartCard: {
//         margin: 16,
//         marginTop: 0,
//     },
//     chartTitle: {
//         marginBottom: 16,
//         paddingHorizontal: 16,
//     },
//     chart: {
//         marginVertical: 8,
//         borderRadius: 16,
//     },
//     durationContainer: {
//         padding: 16,
//     },
//     durationItem: {
//         marginBottom: 16,
//     },
//     durationHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 8,
//     },
//     durationBar: {
//         height: 8,
//         backgroundColor: 'rgba(0, 0, 0, 0.05)',
//         borderRadius: 4,
//         overflow: 'hidden',
//     },
//     durationProgress: {
//         height: '100%',
//         borderRadius: 4,
//     },
// });


// src/screens/StatisticsScreen.tsx
// import React, { useState } from 'react';
// import { View, ScrollView } from 'react-native';
// import { useTheme } from '../hooks/useTheme';
// import { Typography } from '../components/base/Typography';
// import { Card } from '../components/base/Card';
// import { Button } from '../components/base/Button';
// import { useUsageRecords } from '../hooks/useStorage';
// import { LineChart, PieChart } from 'react-native-chart-kit';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import { createStatisticsStyles } from './styles/StatisticsScreen';
// import { createLayoutStyles, createCardStyles, createMetricStyles } from './styles/common';
//
// const TIME_RANGES = [
//     { id: 'week', label: '周', days: 7 },
//     { id: 'month', label: '月', days: 30 },
//     { id: 'quarter', label: '季', days: 90 },
//     { id: 'year', label: '年', days: 365 },
// ];
//
// export default function StatisticsScreen() {
//     const theme = useTheme();
//     const layoutStyles = createLayoutStyles(theme);
//     const cardStyles = createCardStyles(theme);
//     const metricStyles = createMetricStyles(theme);
//     const styles = createStatisticsStyles(theme);
//
//     const [timeRange, setTimeRange] = useState(TIME_RANGES[1]);
//     const { records } = useUsageRecords();
//
//     // 渲染时间范围选择器
//     const renderTimeRangeSelector = () => (
//         <View style={styles.timeRangeContainer}>
//             {TIME_RANGES.map((range) => (
//                 <Button
//                     key={range.id}
//                     variant={timeRange.id === range.id ? 'contained' : 'outlined'}
//                     onPress={() => setTimeRange(range)}
//                     size="small"
//                     style={{ minWidth: 80 }}
//                 >
//                     {range.label}
//                 </Button>
//             ))}
//         </View>
//     );
//
//     // 渲染指标卡片
//     const renderMetrics = () => (
//         <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={metricStyles.container}
//         >
//             <Card style={metricStyles.metricCard}>
//                 <View style={metricStyles.metricHeader}>
//                     <Icon
//                         name="refresh"
//                         size={24}
//                         color={theme.colors.primary.main}
//                     />
//                     <Typography variant="body2" color={theme.colors.text.secondary}>
//                         总更换次数
//                     </Typography>
//                 </View>
//                 <Typography style={metricStyles.metricValue}>
//                     {totalUsage}
//                 </Typography>
//                 <Typography style={metricStyles.metricDescription}>
//                     {timeRange.label}度总计
//                 </Typography>
//             </Card>
//
//             {/* 其他指标卡片 */}
//         </ScrollView>
//     );
//
//     // 渲染图表
//     const renderCharts = () => (
//         <>
//             <Card style={styles.chartCard}>
//                 <Typography variant="h3" style={cardStyles.cardHeader}>
//                     使用趋势
//                 </Typography>
//                 <LineChart
//                     data={chartData}
//                     width={chartWidth}
//                     height={220}
//                     chartConfig={{
//                         backgroundColor: theme.colors.background.paper,
//                         backgroundGradientFrom: theme.colors.background.paper,
//                         backgroundGradientTo: theme.colors.background.paper,
//                         decimalPlaces: 0,
//                         color: (opacity = 1) => theme.colors.primary.main,
//                         style: styles.chart,
//                     }}
//                     bezier
//                     style={styles.chart}
//                 />
//             </Card>
//
//             <Card style={styles.chartCard}>
//                 <Typography variant="h3" style={cardStyles.cardHeader}>
//                     使用时长分布
//                 </Typography>
//                 <View style={cardStyles.cardContent}>
//                     {durationData.map((item) => (
//                         <View key={item.label} style={styles.distributionItem}>
//                             <View style={styles.distributionHeader}>
//                                 <Typography variant="body2">{item.label}</Typography>
//                                 <Typography variant="body2" color={theme.colors.text.secondary}>
//                                     {item.value}%
//                                 </Typography>
//                             </View>
//                             <View style={styles.distributionBar}>
//                                 <View
//                                     style={[
//                                         styles.distributionProgress,
//                                         {
//                                             backgroundColor: item.color,
//                                             width: `${item.value}%`,
//                                         },
//                                     ]}
//                                 />
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             </Card>
//         </>
//     );
//
//     return (
//         <View style={layoutStyles.screen}>
//             {renderTimeRangeSelector()}
//             <ScrollView style={layoutStyles.scrollView}>
//                 {renderMetrics()}
//                 {renderCharts()}
//             </ScrollView>
//         </View>
//     );
// }


// src/screens/StatisticsScreen.tsx
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

                    {/* 其他指标卡片... */}
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
