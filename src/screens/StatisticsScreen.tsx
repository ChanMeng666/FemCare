// import React from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { Card, Text, List, useTheme } from 'react-native-paper';
// import { useUsageRecords } from '../hooks/useStorage';
// import { analyticsService } from '../services/analytics';
// import { ProductType } from '../types';
//
// const productTypeNames: Record<ProductType, string> = {
//     [ProductType.PAD]: '卫生巾',
//     [ProductType.TAMPON]: '卫生棉条',
//     [ProductType.CUP]: '月经杯',
//     [ProductType.DISC]: '月经碟',
// };
//
// export default function StatisticsScreen() {
//     const { records } = useUsageRecords();
//     const theme = useTheme();
//
//     // 简单统计
//     const totalRecords = records.length;
//     const todayRecords = records.filter(
//         record =>
//             new Date(record.timestamp).toDateString() === new Date().toDateString()
//     ).length;
//
//     // 按类型统计
//     const productUsage = records.reduce((acc: Record<ProductType, number>, record) => {
//         acc[record.productType] = (acc[record.productType] || 0) + 1;
//         return acc;
//     }, {} as Record<ProductType, number>);
//
//     return (
//         <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
//             <Card
//                 style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
//                 mode="outlined"
//             >
//                 <Card.Title
//                     title="今日概览"
//                     titleStyle={{ color: theme.colors.text }}
//                 />
//                 <Card.Content>
//                     <Text
//                         variant="bodyMedium"
//                         style={{ color: theme.colors.text, marginBottom: 8 }}
//                     >
//                         今日更换次数: {todayRecords}
//                     </Text>
//                     <Text
//                         variant="bodyMedium"
//                         style={{ color: theme.colors.text }}
//                     >
//                         累计记录: {totalRecords}
//                     </Text>
//                 </Card.Content>
//             </Card>
//
//             <Card
//                 style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
//                 mode="outlined"
//             >
//                 <Card.Title
//                     title="用品使用统计"
//                     titleStyle={{ color: theme.colors.text }}
//                 />
//                 <Card.Content>
//                     <List.Section>
//                         {Object.entries(productUsage).map(([type, count]) => (
//                             <List.Item
//                                 key={type}
//                                 title={productTypeNames[type as ProductType]}
//                                 titleStyle={{ color: theme.colors.text }}
//                                 description={`使用次数: ${count}`}
//                                 descriptionStyle={{ color: theme.colors.text }}
//                                 left={props => (
//                                     <List.Icon
//                                         {...props}
//                                         icon="checkbox-marked-circle"
//                                         color={theme.colors.primary}
//                                     />
//                                 )}
//                             />
//                         ))}
//                     </List.Section>
//                 </Card.Content>
//             </Card>
//         </ScrollView>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     card: {
//         margin: 16,
//         elevation: 2,
//     },
// });


import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Text, SegmentedButtons, useTheme, ProgressBar, List, Chip } from 'react-native-paper';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { useUsageRecords } from '../hooks/useStorage';
import { format, differenceInDays, startOfMonth, endOfMonth } from 'date-fns';
import { ProductType } from '../types';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const { width: screenWidth } = Dimensions.get('window');

export default function StatisticsScreen() {
    const { records } = useUsageRecords();
    const [timeRange, setTimeRange] = useState('week');
    const theme = useTheme();

    // 计算基础统计数据
    const stats = useMemo(() => {
        const now = new Date();
        const monthStart = startOfMonth(now);
        const monthEnd = endOfMonth(now);

        // 本月记录
        const monthRecords = records.filter(r => {
            const date = new Date(r.timestamp);
            return date >= monthStart && date <= monthEnd;
        });

        // 计算平均间隔时间
        let totalInterval = 0;
        let intervalCount = 0;
        for (let i = 1; i < records.length; i++) {
            const interval = (records[i].timestamp - records[i - 1].timestamp) / (1000 * 60 * 60);
            totalInterval += interval;
            intervalCount++;
        }
        const averageInterval = intervalCount > 0 ? Math.round(totalInterval / intervalCount) : 0;

        // 产品使用统计
        const productStats = monthRecords.reduce((acc: Record<ProductType, number>, record) => {
            acc[record.productType] = (acc[record.productType] || 0) + 1;
            return acc;
        }, {} as Record<ProductType, number>);

        // 计算使用时长分布
        const intervals = records.slice(1).map((record, index) =>
            (record.timestamp - records[index].timestamp) / (1000 * 60 * 60)
        );
        const shortCount = intervals.filter(i => i <= 4).length;
        const normalCount = intervals.filter(i => i > 4 && i <= 6).length;
        const longCount = intervals.filter(i => i > 6).length;
        const totalCount = intervals.length || 1;

        return {
            monthlyCount: monthRecords.length,
            averageInterval,
            productStats,
            intervalDistribution: {
                short: (shortCount / totalCount) * 100,
                normal: (normalCount / totalCount) * 100,
                long: (longCount / totalCount) * 100,
            }
        };
    }, [records]);

    // 产品类型名称映射
    const productTypeNames: Record<ProductType, string> = {
        [ProductType.PAD]: '卫生巾',
        [ProductType.TAMPON]: '卫生棉条',
        [ProductType.CUP]: '月经杯',
        [ProductType.DISC]: '月经碟',
    };

    // 渲染使用频率卡片
    const renderUsageCard = () => (
        <Card style={styles.card}>
            <Card.Title
                title="使用频率"
                left={props => <Icon {...props} name="clock-outline" size={24} color={theme.colors.primary} />}
            />
            <Card.Content>
                <View style={styles.statsGrid}>
                    <View style={styles.statsItem}>
                        <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
                            {stats.monthlyCount}
                        </Text>
                        <Text variant="bodyMedium">本月更换次数</Text>
                    </View>
                    <View style={styles.statsItem}>
                        <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
                            {stats.averageInterval}
                        </Text>
                        <Text variant="bodyMedium">平均间隔(小时)</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );

    // 渲染使用时长分布卡片
    const renderDurationCard = () => (
        <Card style={styles.card}>
            <Card.Title
                title="使用时长分布"
                left={props => <Icon {...props} name="chart-timeline-variant" size={24} color={theme.colors.primary} />}
            />
            <Card.Content>
                <View style={styles.durationItem}>
                    <View style={styles.durationLabel}>
                        <Text>较短 (≤4小时)</Text>
                        <Text>{Math.round(stats.intervalDistribution.short)}%</Text>
                    </View>
                    <ProgressBar
                        progress={stats.intervalDistribution.short / 100}
                        color={theme.colors.primary}
                        style={styles.progressBar}
                    />
                </View>
                <View style={styles.durationItem}>
                    <View style={styles.durationLabel}>
                        <Text>适中 (4-6小时)</Text>
                        <Text>{Math.round(stats.intervalDistribution.normal)}%</Text>
                    </View>
                    <ProgressBar
                        progress={stats.intervalDistribution.normal / 100}
                        color={theme.colors.primary}
                        style={styles.progressBar}
                    />
                </View>
                <View style={styles.durationItem}>
                    <View style={styles.durationLabel}>
                        <Text>较长 (大于6小时)</Text>
                        <Text>{Math.round(stats.intervalDistribution.long)}%</Text>
                    </View>
                    <ProgressBar
                        progress={stats.intervalDistribution.long / 100}
                        color={theme.colors.error}
                        style={styles.progressBar}
                    />
                </View>
            </Card.Content>
        </Card>
    );

    // 渲染产品使用统计卡片
    const renderProductStatsCard = () => (
        <Card style={styles.card}>
            <Card.Title
                title="产品使用统计"
                left={props => <Icon {...props} name="package-variant" size={24} color={theme.colors.primary} />}
            />
            <Card.Content>
                {Object.entries(stats.productStats).map(([type, count]) => (
                    <View key={type} style={styles.productItem}>
                        <View style={styles.productInfo}>
                            <Text variant="bodyLarge">{productTypeNames[type as ProductType]}</Text>
                            <Chip
                                mode="flat"
                                style={{ backgroundColor: theme.colors.primaryContainer }}
                            >
                                {count} 次
                            </Chip>
                        </View>
                        <ProgressBar
                            progress={count / stats.monthlyCount}
                            color={theme.colors.primary}
                            style={styles.progressBar}
                        />
                    </View>
                ))}
            </Card.Content>
        </Card>
    );

    // 渲染使用建议卡片
    const renderSuggestionsCard = () => (
        <Card style={styles.card}>
            <Card.Title
                title="使用建议"
                left={props => <Icon {...props} name="lightbulb-outline" size={24} color={theme.colors.primary} />}
            />
            <Card.Content>
                <List.Item
                    title="更换频率"
                    description={
                        stats.averageInterval > 6
                            ? "建议：您的平均更换间隔偏长，建议适当缩短更换间隔"
                            : "建议：您的更换频率合理，请继续保持"
                    }
                    left={props => (
                        <Icon
                            {...props}
                            name={stats.averageInterval > 6 ? "alert" : "check-circle"}
                            size={24}
                            color={stats.averageInterval > 6 ? theme.colors.error : theme.colors.primary}
                        />
                    )}
                />
            </Card.Content>
        </Card>
    );

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.content}
        >
            {/* 时间范围选择器 */}
            <SegmentedButtons
                value={timeRange}
                onValueChange={setTimeRange}
                buttons={[
                    { value: 'week', label: '周' },
                    { value: 'month', label: '月' },
                    { value: 'year', label: '年' },
                ]}
                style={styles.segmentedButtons}
            />

            {renderUsageCard()}
            {renderDurationCard()}
            {renderProductStatsCard()}
            {renderSuggestionsCard()}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    segmentedButtons: {
        marginBottom: 16,
    },
    card: {
        marginBottom: 16,
        elevation: 2,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    statsItem: {
        alignItems: 'center',
    },
    durationItem: {
        marginVertical: 8,
    },
    durationLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
    },
    productItem: {
        marginVertical: 8,
    },
    productInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
