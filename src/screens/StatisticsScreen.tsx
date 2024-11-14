// import React from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { Card, Text, List } from 'react-native-paper';
// import { useUsageRecords } from '../hooks/useStorage';
// import { analyticsService } from '../services/analytics';
//
// export default function StatisticsScreen() {
//     const { records } = useUsageRecords();
//
//     // 简单统计
//     const totalRecords = records.length;
//     const todayRecords = records.filter(
//         record =>
//             new Date(record.timestamp).toDateString() === new Date().toDateString()
//     ).length;
//
//     // 按类型统计
//     const productUsage = records.reduce((acc: any, record) => {
//         acc[record.productType] = (acc[record.productType] || 0) + 1;
//         return acc;
//     }, {});
//
//     return (
//         <ScrollView style={styles.container}>
//             <Card style={styles.card}>
//                 <Card.Title title="今日概览" />
//                 <Card.Content>
//                     <Text variant="bodyMedium">今日更换次数: {todayRecords}</Text>
//                     <Text variant="bodyMedium">累计记录: {totalRecords}</Text>
//                 </Card.Content>
//             </Card>
//
//             <Card style={styles.card}>
//                 <Card.Title title="用品使用统计" />
//                 <Card.Content>
//                     <List.Section>
//                         {Object.entries(productUsage).map(([type, count]) => (
//                             <List.Item
//                                 key={type}
//                                 title={type}
//                                 description={`使用次数: ${count}`}
//                                 left={props => <List.Icon {...props} icon="checkbox-marked-circle" />}
//                             />
//                         ))}
//                     </List.Section>
//                 </Card.Content>
//             </Card>
//
//
//         </ScrollView>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     card: {
//         margin: 16,
//     },
// });


import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Text, List, useTheme } from 'react-native-paper';
import { useUsageRecords } from '../hooks/useStorage';
import {
    VictoryPie,
    VictoryChart,
    VictoryLine,
    VictoryAxis,
    VictoryTheme,
    VictoryLabel
} from 'victory-native';
import { format } from 'date-fns';
import { ProductType } from '../types';

const COLORS = ['#FF8B8B', '#A6CF98', '#A7C5EB', '#B4A7D6'];
const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
    const { records } = useUsageRecords();
    const theme = useTheme();

    // 按日期分组的使用记录
    const dailyUsage = useMemo(() => {
        const grouped = records.reduce((acc: any, record) => {
            const date = format(new Date(record.timestamp), 'MM-dd');
            if (!acc[date]) {
                acc[date] = { date, count: 0 };
            }
            acc[date].count++;
            return acc;
        }, {});
        return Object.values(grouped).slice(-7); // 最近7天
    }, [records]);

    // 按类型统计的使用量
    const productUsage = useMemo(() => {
        const usage = records.reduce((acc: any, record) => {
            const type = record.productType;
            if (!acc[type]) {
                acc[type] = { name: type, value: 0 };
            }
            acc[type].value++;
            return acc;
        }, {});
        return Object.values(usage);
    }, [records]);

    const renderUsageTrendChart = () => (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>使用趋势</Text>
            <VictoryChart
                width={screenWidth - 48}
                height={200}
                theme={VictoryTheme.material}
                padding={{ top: 10, right: 40, bottom: 40, left: 40 }}
            >
                <VictoryAxis
                    tickFormat={(date) => date}
                    style={{
                        tickLabels: { angle: -45, fontSize: 8, padding: 15 }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(count) => Math.round(count)}
                />
                <VictoryLine
                    data={dailyUsage}
                    x="date"
                    y="count"
                    style={{
                        data: { stroke: theme.colors.primary },
                    }}
                />
            </VictoryChart>
        </View>
    );

    const renderProductUsageChart = () => (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>用品使用分布</Text>
            <VictoryPie
                data={productUsage}
                x="name"
                y="value"
                width={screenWidth - 48}
                height={200}
                colorScale={COLORS}
                labels={({ datum }) => `${datum.name}\n${datum.value}次`}
                style={{
                    labels: {
                        fontSize: 10,
                        fill: theme.colors.onSurface
                    }
                }}
            />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="使用概览" />
                <Card.Content>
                    <Text variant="bodyMedium">
                        今日更换次数: {dailyUsage[dailyUsage.length - 1]?.count || 0}
                    </Text>
                    <Text variant="bodyMedium">
                        累计记录: {records.length}
                    </Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                {renderUsageTrendChart()}
            </Card>

            <Card style={styles.card}>
                {renderProductUsageChart()}
            </Card>

            <Card style={styles.card}>
                <Card.Title title="详细统计" />
                <Card.Content>
                    <List.Section>
                        {Object.entries(ProductType).map(([key, value]) => {
                            const count = records.filter(r => r.productType === value).length;
                            const percentage = ((count / records.length) * 100).toFixed(1);

                            return (
                                <List.Item
                                    key={key}
                                    title={value}
                                    description={`${count} 次 (${percentage}%)`}
                                    left={props => (
                                        <View
                                            style={[
                                                styles.productTypeIndicator,
                                                { backgroundColor: COLORS[Object.keys(ProductType).indexOf(key)] }
                                            ]}
                                        />
                                    )}
                                />
                            );
                        })}
                    </List.Section>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        margin: 16,
        elevation: 4,
    },
    chartContainer: {
        padding: 16,
        alignItems: 'center',
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    productTypeIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
});
