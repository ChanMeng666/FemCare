import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List } from 'react-native-paper';
import { useUsageRecords } from '../hooks/useStorage';
import { analyticsService } from '../services/analytics';

export default function StatisticsScreen() {
    const { records } = useUsageRecords();

    // 简单统计
    const totalRecords = records.length;
    const todayRecords = records.filter(
        record =>
            new Date(record.timestamp).toDateString() === new Date().toDateString()
    ).length;

    // 按类型统计
    const productUsage = records.reduce((acc: any, record) => {
        acc[record.productType] = (acc[record.productType] || 0) + 1;
        return acc;
    }, {});

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="今日概览" />
                <Card.Content>
                    <Text variant="bodyMedium">今日更换次数: {todayRecords}</Text>
                    <Text variant="bodyMedium">累计记录: {totalRecords}</Text>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title="用品使用统计" />
                <Card.Content>
                    <List.Section>
                        {Object.entries(productUsage).map(([type, count]) => (
                            <List.Item
                                key={type}
                                title={type}
                                description={`使用次数: ${count}`}
                                left={props => <List.Icon {...props} icon="checkbox-marked-circle" />}
                            />
                        ))}
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
    },
});


