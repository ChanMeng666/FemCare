import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Typography } from '../components/base/Typography';
import { Card } from '../components/base/Card';
import { Button } from '../components/base/Button';
import { IconButton } from '../components/base/IconButton';
import { useUsageRecords } from '../hooks/useStorage';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createHomeStyles } from './styles';
import { createLayoutStyles, createCardStyles } from './styles/common';

export default function HomeScreen() {
    const theme = useTheme();
    const layoutStyles = createLayoutStyles(theme);
    const cardStyles = createCardStyles(theme);
    const styles = createHomeStyles(theme);

    const [quickActionVisible, setQuickActionVisible] = useState(false);
    const { records, addRecord } = useUsageRecords();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(100)).current;

    // 获取最近的使用记录
    const getLastUsageInfo = () => {
        if (records.length === 0) return null;

        const lastRecord = records[records.length - 1];
        const now = new Date();
        const lastTime = new Date(lastRecord.timestamp);

        const hours = differenceInHours(now, lastTime);
        const minutes = differenceInMinutes(now, lastTime) % 60;

        const isOverdue = hours >= 6;

        return {
            hours,
            minutes,
            isOverdue,
            type: lastRecord.productType,
        };
    };

    // 生成时间轴数据
    const getTimelineData = useCallback((): TimelineItem[] => {
        return records.slice(-5).map(record => {
            const date = new Date(record.timestamp);
            const now = new Date();
            const hours = differenceInHours(now, date);
            const minutes = differenceInMinutes(now, date) % 60;

            return {
                time: format(date, 'HH:mm'),
                type: record.productType,
                duration: `${hours}小时${minutes}分钟前`,
            };
        }).reverse();
    }, [records]);

    // 处理快速记录
    const handleQuickRecord = async (type: ProductType) => {
        const success = await addRecord({
            timestamp: Date.now(),
            productType: type,
        });

        if (success) {
            await scheduleReminder();
            setQuickActionVisible(false);
            showSuccessAnimation();
        }
    };

    // 显示成功动画
    const showSuccessAnimation = () => {
        fadeAnim.setValue(0);
        slideAnim.setValue(100);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 2000);
        });
    };

    // 渲染状态卡片
    const renderStatusCard = () => {
        const lastUsage = getLastUsageInfo();


        return (
            <View style={layoutStyles.screen}>
                <ScrollView style={layoutStyles.scrollViewWithPadding}>
                    <Card elevation="md" style={styles.statusCard}>
                        <View style={cardStyles.cardHeader}>
                            <Typography variant="h2">使用状态</Typography>
                            <IconButton
                                onPress={() => setQuickActionVisible(true)}
                                size="large"
                                color={theme.colors.primary.main}
                            >
                                <Icon name="plus" size={24} color={theme.colors.primary.main}/>
                            </IconButton>
                        </View>

                        {lastUsage ? (
                            <>
                                <View style={styles.statusInfo}>
                                    <Icon
                                        name={getProductIcon(lastUsage.type)}
                                        size={32}
                                        color={lastUsage.isOverdue
                                            ? theme.colors.error.main
                                            : theme.colors.primary.main}
                                    />
                                    <View style={styles.statusText}>
                                        <Typography variant="h3">
                                            {formatDuration(lastUsage)}
                                        </Typography>
                                        <Typography variant="body2" color={theme.colors.text.secondary}>
                                            已使用 {getProductName(lastUsage.type)}
                                        </Typography>
                                    </View>
                                </View>

                                {lastUsage.isOverdue && (
                                    <Typography
                                        variant="body2"
                                        color={theme.colors.error.main}
                                        style={styles.warningText}
                                    >
                                        ⚠️ 建议尽快更换，避免健康风险
                                    </Typography>
                                )}
                            </>
                        ) : (
                            <Typography variant="body1" style={styles.emptyText}>
                                暂无使用记录
                            </Typography>
                        )}
                    </Card>

                    {/* 快速操作面板 */}
                    {quickActionVisible && (
                        <View style={styles.quickActionOverlay}>
                            <TouchableOpacity
                                style={styles.overlayBackdrop}
                                onPress={() => setQuickActionVisible(false)}
                            />
                            <Card
                                elevation="lg"
                                style={styles.quickActionPanel}
                            >
                                <Typography variant="h2" style={cardStyles.cardHeader}>
                                    记录更换
                                </Typography>

                                <View style={styles.productGrid}>
                                    {Object.entries(ProductType).map(([key, type]) => (
                                        <TouchableOpacity
                                            key={key}
                                            style={[
                                                styles.productItem,
                                                selectedProduct === type && {
                                                    backgroundColor: theme.colors.primary.main,
                                                },
                                            ]}
                                            onPress={() => handleQuickRecord(type)}
                                        >
                                            <Icon
                                                name={ProductIcons[type]}
                                                size={32}
                                                color={
                                                    selectedProduct === type
                                                        ? theme.colors.primary.contrast
                                                        : theme.colors.primary.main
                                                }
                                            />
                                            <Typography
                                                variant="caption"
                                                color={
                                                    selectedProduct === type
                                                        ? theme.colors.primary.contrast
                                                        : theme.colors.text.primary
                                                }
                                                style={styles.productName}
                                            >
                                                {ProductNames[type]}
                                            </Typography>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Card>
                        </View>
                    )}

                    {/* 成功提示 */}
                    <Animated.View style={[
                        styles.successToast,
                        {
                            opacity: fadeAnim,
                            transform: [{translateY: slideAnim}],
                        }
                    ]}>
                        <Icon name="check-circle" size={24} color="white"/>
                        <Typography
                            variant="body2"
                            color="white"
                            style={{marginLeft: theme.spacing.sm}}
                        >
                            记录已保存
                        </Typography>
                    </Animated.View>

                    {/* 时间轴 */}
                    <Card elevation="sm">
                        <Typography variant="h3" style={cardStyles.cardHeader}>
                            最近记录
                        </Typography>
                        {timelineData.map((item, index) => (
                            <View key={index} style={styles.timelineItem}>
                                <View style={styles.timelineDot}/>
                                <View style={styles.timelineContent}>
                                    <Typography variant="body1">
                                        {getProductName(item.type)}
                                    </Typography>
                                    <Typography variant="caption" color={theme.colors.text.secondary}>
                                        {item.time} ({item.duration})
                                    </Typography>
                                </View>
                            </View>
                        ))}
                    </Card>
                </ScrollView>
            </View>
        );
    }
}
