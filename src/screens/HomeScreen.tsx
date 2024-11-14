// import React, { useState, useCallback } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Text, Card, FAB, Portal, Dialog, Button, RadioButton, Snackbar, useTheme } from 'react-native-paper';
// import { useUsageRecords, useSettings } from '../hooks/useStorage';
// import { useNotifications } from '../hooks/useNotification';
// import { ProductType } from '../types';
//
// export default function HomeScreen() {
//     const { records, addRecord } = useUsageRecords();
//     const { settings } = useSettings();
//     const [dialogVisible, setDialogVisible] = useState(false);
//     const [selectedType, setSelectedType] = useState<ProductType>(ProductType.PAD);
//     const theme = useTheme();
//
//     const { scheduleReminder } = useNotifications();
//     const [snackbarVisible, setSnackbarVisible] = useState(false);
//
//     const handleAddRecord = async () => {
//         const success = await addRecord({
//             timestamp: Date.now(),
//             productType: selectedType,
//         });
//
//         if (success) {
//             await scheduleReminder();
//             setSnackbarVisible(true);
//         }
//
//         setDialogVisible(false);
//     };
//
//     const getLastChangeTime = () => {
//         if (records.length === 0) return null;
//         const lastRecord = records[records.length - 1];
//         const timeDiff = Date.now() - lastRecord.timestamp;
//         const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//         const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//         return `${hours}小时${minutes}分钟`;
//     };
//
//     return (
//         <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//             <Card style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
//                 <Card.Title title="使用状态" />
//                 <Card.Content>
//                     <Text variant="bodyMedium">
//                         {records.length > 0
//                             ? `上次更换时间: ${getLastChangeTime()}前`
//                             : '暂无记录'}
//                     </Text>
//                 </Card.Content>
//             </Card>
//
//             <FAB
//                 style={[styles.fab, { backgroundColor: theme.colors.fabBackground }]}
//                 icon="plus"
//                 onPress={() => setDialogVisible(true)}
//                 label="记录更换"
//             />
//
//             <Portal>
//                 <Dialog
//                     visible={dialogVisible}
//                     onDismiss={() => setDialogVisible(false)}
//                     style={{ backgroundColor: theme.colors.dialogBackground }}
//                 >
//                     <Dialog.Title>选择使用的卫生用品</Dialog.Title>
//                     <Dialog.Content>
//                         <RadioButton.Group
//                             onValueChange={value => setSelectedType(value as ProductType)}
//                             value={selectedType}>
//                             <RadioButton.Item label="卫生巾" value={ProductType.PAD} />
//                             <RadioButton.Item label="卫生棉条" value={ProductType.TAMPON} />
//                             <RadioButton.Item label="月经杯" value={ProductType.CUP} />
//                             <RadioButton.Item label="月经碟" value={ProductType.DISC} />
//                         </RadioButton.Group>
//                     </Dialog.Content>
//                     <Dialog.Actions>
//                         <Button
//                             onPress={() => setDialogVisible(false)}
//                             textColor={theme.colors.text}
//                         >
//                             取消
//                         </Button>
//                         <Button
//                             onPress={handleAddRecord}
//                             textColor={theme.colors.primary}
//                         >
//                             确认
//                         </Button>
//                     </Dialog.Actions>
//                 </Dialog>
//             </Portal>
//
//             <Snackbar
//                 visible={snackbarVisible}
//                 onDismiss={() => setSnackbarVisible(false)}
//                 duration={3000}
//                 style={{ backgroundColor: theme.colors.surface }}
//                 action={{
//                     label: '关闭',
//                     onPress: () => setSnackbarVisible(false),
//                 }}>
//                 已设置下次更换提醒
//             </Snackbar>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     card: {
//         marginBottom: 16,
//     },
//     fab: {
//         position: 'absolute',
//         margin: 16,
//         right: 0,
//         bottom: 0,
//     },
// });


import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Card, Portal, Dialog, Button, IconButton, Surface, useTheme } from 'react-native-paper';
import { useUsageRecords, useSettings } from '../hooks/useStorage';
import { useNotifications } from '../hooks/useNotification';
import { ProductType } from '../types';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// 获取屏幕宽度用于计算按钮大小
const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
    const { records, addRecord } = useUsageRecords();
    const { settings } = useSettings();
    const { scheduleReminder } = useNotifications();
    const [quickActionVisible, setQuickActionVisible] = useState(false);
    const [emergencyVisible, setEmergencyVisible] = useState(false);
    const theme = useTheme();

    // 计算上次更换到现在的时间
    const getLastChangeInfo = () => {
        if (records.length === 0) return null;
        const lastRecord = records[records.length - 1];
        const timeDiff = Date.now() - lastRecord.timestamp;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

        // 判断是否超时
        const isOverdue = hours >= (settings.reminderInterval / 60);

        return {
            hours,
            minutes,
            isOverdue,
            productType: lastRecord.productType
        };
    };

    // 快速记录更换
    const handleQuickChange = async (productType: ProductType) => {
        const success = await addRecord({
            timestamp: Date.now(),
            productType,
        });

        if (success) {
            await scheduleReminder();
            setQuickActionVisible(false);
        }
    };

    const lastChangeInfo = getLastChangeInfo();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* 状态卡片 */}
            <Card
                style={[styles.card, {
                    backgroundColor: theme.colors.surface,
                    borderColor: lastChangeInfo?.isOverdue ? theme.colors.error : theme.colors.primary,
                    borderWidth: 1
                }]}
            >
                <Card.Content>
                    <Text variant="titleLarge" style={styles.cardTitle}>
                        使用状态
                    </Text>
                    {lastChangeInfo ? (
                        <>
                            <Text
                                variant="bodyLarge"
                                style={[
                                    styles.timeText,
                                    { color: lastChangeInfo.isOverdue ? theme.colors.error : theme.colors.text }
                                ]}
                            >
                                {`已使用 ${lastChangeInfo.hours}小时 ${lastChangeInfo.minutes}分钟`}
                            </Text>
                            {lastChangeInfo.isOverdue && (
                                <Text style={{ color: theme.colors.error }}>
                                    ⚠️ 建议尽快更换
                                </Text>
                            )}
                        </>
                    ) : (
                        <Text variant="bodyMedium">暂无使用记录</Text>
                    )}
                </Card.Content>
            </Card>

            {/* 快速操作区 */}
            <Surface style={styles.quickActions} elevation={0}>
                <TouchableOpacity
                    style={[styles.mainButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => setQuickActionVisible(true)}
                >
                    <Icon name="plus" size={32} color="white" />
                    <Text style={styles.mainButtonText}>记录更换</Text>
                </TouchableOpacity>

                <View style={styles.secondaryButtons}>
                    <IconButton
                        icon="clock-outline"
                        size={28}
                        mode="contained"
                        onPress={() => {/* 调整提醒时间 */}}
                        style={styles.secondaryButton}
                    />
                    <IconButton
                        icon="bell-off-outline"
                        size={28}
                        mode="contained"
                        onPress={() => {/* 暂停提醒 */}}
                        style={styles.secondaryButton}
                    />
                    <IconButton
                        icon="alert-octagon-outline"
                        size={28}
                        mode="contained"
                        onPress={() => setEmergencyVisible(true)}
                        style={[styles.secondaryButton, { backgroundColor: theme.colors.error }]}
                    />
                </View>
            </Surface>

            {/* 快速记录对话框 */}
            <Portal>
                <Dialog
                    visible={quickActionVisible}
                    onDismiss={() => setQuickActionVisible(false)}
                    style={{ backgroundColor: theme.colors.surface }}
                >
                    <Dialog.Title>快速记录</Dialog.Title>
                    <Dialog.Content>
                        <View style={styles.quickChangeButtons}>
                            <Button
                                mode="contained"
                                onPress={() => handleQuickChange(ProductType.PAD)}
                                style={styles.productButton}
                            >
                                卫生巾
                            </Button>
                            <Button
                                mode="contained"
                                onPress={() => handleQuickChange(ProductType.TAMPON)}
                                style={styles.productButton}
                            >
                                卫生棉条
                            </Button>
                            <Button
                                mode="contained"
                                onPress={() => handleQuickChange(ProductType.CUP)}
                                style={styles.productButton}
                            >
                                月经杯
                            </Button>
                        </View>
                    </Dialog.Content>
                </Dialog>

                {/* 紧急指南对话框 */}
                <Dialog
                    visible={emergencyVisible}
                    onDismiss={() => setEmergencyVisible(false)}
                    style={{ backgroundColor: theme.colors.surface }}
                >
                    <Dialog.Title>异常处理指南</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            1. 保持冷静,找到安全的私密空间
                        </Text>
                        <Text variant="bodyMedium">
                            2. 如果无法自行取出,请及时就医
                        </Text>
                        <Text variant="bodyMedium">
                            3. 建议记录使用时间,便于医生诊断
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => setEmergencyVisible(false)}
                            textColor={theme.colors.text}
                        >
                            关闭
                        </Button>
                        <Button
                            onPress={() => {/* 拨打急救电话 */}}
                            textColor={theme.colors.error}
                        >
                            拨打急救电话
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        marginBottom: 20,
        borderRadius: 12,
    },
    cardTitle: {
        marginBottom: 8,
    },
    timeText: {
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 8,
    },
    quickActions: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    mainButton: {
        width: screenWidth * 0.8,
        height: 100,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    mainButtonText: {
        color: 'white',
        fontSize: 18,
        marginTop: 8,
    },
    secondaryButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    secondaryButton: {
        margin: 8,
    },
    quickChangeButtons: {
        gap: 12,
    },
    productButton: {
        marginVertical: 4,
    },
});
