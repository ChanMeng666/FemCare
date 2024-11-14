import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Card } from '../components/base/Card';
import { Typography } from '../components/base/Typography';
import { Button } from '../components/base/Button';
import { IconButton } from '../components/base/IconButton';
import { useUsageRecords } from '../hooks/useStorage';
import { useNotifications } from '../hooks/useNotification';
import { ProductType } from '../types';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { format, differenceInHours, differenceInMinutes } from 'date-fns';

interface TimelineItem {
    time: string;
    type: ProductType;
    duration: string;
}

const ProductIcons: Record<ProductType, string> = {
    [ProductType.PAD]: 'bandage',
    [ProductType.TAMPON]: 'water',
    [ProductType.CUP]: 'cup',
    [ProductType.DISC]: 'disc',
};

const ProductNames: Record<ProductType, string> = {
    [ProductType.PAD]: '卫生巾',
    [ProductType.TAMPON]: '卫生棉条',
    [ProductType.CUP]: '月经杯',
    [ProductType.DISC]: '月经碟',
};

export default function HomeScreen() {
    const theme = useTheme();
    const { records, addRecord } = useUsageRecords();
    const { scheduleReminder } = useNotifications();
    const [quickActionVisible, setQuickActionVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductType>(ProductType.PAD);

    // 动画值
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
            <Card
                elevation="md"
                style={[
                    styles.card,
                    lastUsage?.isOverdue && styles.overdueCard,
                ]}
            >
                <View style={styles.cardHeader}>
                    <Typography variant="h2">使用状态</Typography>
                    <IconButton
                        onPress={() => setQuickActionVisible(true)}
                        size="large"
                        color={theme.colors.primary.main}
                    >
                        <Icon
                            name="plus"
                            size={24}
                            color={theme.colors.primary.main}
                        />
                    </IconButton>
                </View>

                {lastUsage ? (
                    <>
                        <View style={styles.statusInfo}>
                            <Icon
                                name={ProductIcons[lastUsage.type]}
                                size={32}
                                color={lastUsage.isOverdue ? theme.colors.error.main : theme.colors.primary.main}
                            />
                            <View style={styles.statusText}>
                                <Typography variant="h3">
                                    {`${lastUsage.hours}小时 ${lastUsage.minutes}分钟`}
                                </Typography>
                                <Typography variant="body2" color={theme.colors.text.secondary}>
                                    已使用 {ProductNames[lastUsage.type]}
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
        );
    };

    // 渲染时间轴
    const renderTimeline = () => {
        const timelineData = getTimelineData();

        return (
            <Card elevation="sm" style={styles.card}>
                <Typography variant="h3" style={styles.timelineTitle}>
                    最近记录
                </Typography>

                {timelineData.map((item, index) => (
                    <View key={index} style={styles.timelineItem}>
                        <View style={styles.timelineDot} />
                        <View style={styles.timelineContent}>
                            <Typography variant="body1">
                                {ProductNames[item.type]}
                            </Typography>
                            <Typography variant="caption" color={theme.colors.text.secondary}>
                                {item.time} ({item.duration})
                            </Typography>
                        </View>
                    </View>
                ))}
            </Card>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background.default }]}>
            <ScrollView style={styles.scrollView}>
                {renderStatusCard()}
                {renderTimeline()}

                {/* 统计卡片可以在这里添加 */}
            </ScrollView>

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
                        <Typography variant="h2" style={styles.quickActionTitle}>
                            记录更换
                        </Typography>

                        <View style={styles.productGrid}>
                            {Object.entries(ProductType).map(([key, type]) => (
                                <TouchableOpacity
                                    key={key}
                                    style={[
                                        styles.productItem,
                                        selectedProduct === type && styles.selectedProduct,
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

            {/* 成功提示动画 */}
            <Animated.View
                style={[
                    styles.successToast,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                        backgroundColor: theme.colors.success.main,
                    },
                ]}
            >
                <Icon name="check-circle" size={24} color="white" />
                <Typography
                    variant="body2"
                    color="white"
                    style={styles.successText}
                >
                    记录已保存
                </Typography>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    card: {
        marginBottom: 16,
    },
    overdueCard: {
        borderWidth: 1,
        borderColor: 'red',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    statusText: {
        marginLeft: 16,
    },
    warningText: {
        marginTop: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 16,
    },
    timelineTitle: {
        marginBottom: 16,
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FF69B4',
        marginRight: 12,
    },
    timelineContent: {
        flex: 1,
    },
    quickActionOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
    },
    overlayBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    quickActionPanel: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
    },
    quickActionTitle: {
        marginBottom: 24,
        textAlign: 'center',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: -8,
    },
    productItem: {
        width: '45%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F7',
        borderRadius: 12,
        margin: 8,
    },
    selectedProduct: {
        backgroundColor: '#FF69B4',
    },
    productName: {
        marginTop: 8,
        textAlign: 'center',
    },
    successToast: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successText: {
        marginLeft: 8,
    },
});
