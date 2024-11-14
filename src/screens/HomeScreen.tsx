import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, FAB, Portal, Dialog, Button, RadioButton, Snackbar } from 'react-native-paper';
import { useUsageRecords, useSettings } from '../hooks/useStorage';
import { useNotifications } from '../hooks/useNotification';
import { ProductType } from '../types';

export default function HomeScreen() {
    const { records, addRecord } = useUsageRecords();
    const { settings } = useSettings();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedType, setSelectedType] = useState<ProductType>(ProductType.PAD);

    const { scheduleReminder } = useNotifications();
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const handleAddRecord = async () => {
        const success = await addRecord({
            timestamp: Date.now(),
            productType: selectedType,
        });

        if (success) {
            // 记录成功后，调度下一次提醒
            await scheduleReminder();
            setSnackbarVisible(true);
        }

        setDialogVisible(false);
    };

    const getLastChangeTime = () => {
        if (records.length === 0) return null;
        const lastRecord = records[records.length - 1];
        const timeDiff = Date.now() - lastRecord.timestamp;
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}小时${minutes}分钟`;
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="使用状态" />
                <Card.Content>
                    <Text variant="bodyMedium">
                        {records.length > 0
                            ? `上次更换时间: ${getLastChangeTime()}前`
                            : '暂无记录'}
                    </Text>
                </Card.Content>
            </Card>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => setDialogVisible(true)}
                label="记录更换"
            />

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title>选择使用的卫生用品</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group
                            onValueChange={value => setSelectedType(value as ProductType)}
                            value={selectedType}>
                            <RadioButton.Item label="卫生巾" value={ProductType.PAD} />
                            <RadioButton.Item label="卫生棉条" value={ProductType.TAMPON} />
                            <RadioButton.Item label="月经杯" value={ProductType.CUP} />
                            <RadioButton.Item label="月经碟" value={ProductType.DISC} />
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>取消</Button>
                        <Button onPress={handleAddRecord}>确认</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                action={{
                    label: '关闭',
                    onPress: () => setSnackbarVisible(false),
                }}>
                已设置下次更换提醒
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        marginBottom: 16,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
