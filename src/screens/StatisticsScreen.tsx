import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, List, useTheme } from 'react-native-paper';
import { useUsageRecords } from '../hooks/useStorage';
import { analyticsService } from '../services/analytics';
import { ProductType } from '../types';

const productTypeNames: Record<ProductType, string> = {
    [ProductType.PAD]: '卫生巾',
    [ProductType.TAMPON]: '卫生棉条',
    [ProductType.CUP]: '月经杯',
    [ProductType.DISC]: '月经碟',
};

export default function StatisticsScreen() {
    const { records } = useUsageRecords();
    const theme = useTheme();

    // 简单统计
    const totalRecords = records.length;
    const todayRecords = records.filter(
        record =>
            new Date(record.timestamp).toDateString() === new Date().toDateString()
    ).length;

    // 按类型统计
    const productUsage = records.reduce((acc: Record<ProductType, number>, record) => {
        acc[record.productType] = (acc[record.productType] || 0) + 1;
        return acc;
    }, {} as Record<ProductType, number>);

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Card
                style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
                mode="outlined"
            >
                <Card.Title
                    title="今日概览"
                    titleStyle={{ color: theme.colors.text }}
                />
                <Card.Content>
                    <Text
                        variant="bodyMedium"
                        style={{ color: theme.colors.text, marginBottom: 8 }}
                    >
                        今日更换次数: {todayRecords}
                    </Text>
                    <Text
                        variant="bodyMedium"
                        style={{ color: theme.colors.text }}
                    >
                        累计记录: {totalRecords}
                    </Text>
                </Card.Content>
            </Card>

            <Card
                style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
                mode="outlined"
            >
                <Card.Title
                    title="用品使用统计"
                    titleStyle={{ color: theme.colors.text }}
                />
                <Card.Content>
                    <List.Section>
                        {Object.entries(productUsage).map(([type, count]) => (
                            <List.Item
                                key={type}
                                title={productTypeNames[type as ProductType]}
                                titleStyle={{ color: theme.colors.text }}
                                description={`使用次数: ${count}`}
                                descriptionStyle={{ color: theme.colors.text }}
                                left={props => (
                                    <List.Icon
                                        {...props}
                                        icon="checkbox-marked-circle"
                                        color={theme.colors.primary}
                                    />
                                )}
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
    },
    card: {
        margin: 16,
        elevation: 2,
    },
});
