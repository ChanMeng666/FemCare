import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card, Text, Button, Portal, Dialog, RadioButton, useTheme } from 'react-native-paper';
import { format } from 'date-fns';
import { useUsageRecords } from '../hooks/useStorage';
import { MoodType, SymptomType } from '../types';

export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const { records } = useUsageRecords();
    const theme = useTheme();

    const markedDates = records.reduce((acc: any, record) => {
        const dateString = format(new Date(record.timestamp), 'yyyy-MM-dd');
        acc[dateString] = {
            marked: true,
            dotColor: theme.colors.calendarDot
        };
        return acc;
    }, {});

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Calendar
                markedDates={markedDates}
                onDayPress={day => {
                    setSelectedDate(day.dateString);
                    setDialogVisible(true);
                }}
                theme={{
                    selectedDayBackgroundColor: theme.colors.calendarSelected,
                    todayTextColor: theme.colors.calendarToday,
                    arrowColor: theme.colors.primary,
                    monthTextColor: theme.colors.text,
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                    selectedDotColor: theme.colors.background,
                }}
            />

            <Card style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <Card.Title title="本月统计" />
                <Card.Content>
                    <Text variant="bodyMedium">
                        更换次数: {Object.keys(markedDates).length}
                    </Text>
                </Card.Content>
            </Card>

            <Portal>
                <Dialog
                    visible={dialogVisible}
                    onDismiss={() => setDialogVisible(false)}
                    style={{ backgroundColor: theme.colors.dialogBackground }}
                >
                    <Dialog.Title>添加记录</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={() => {}} value="">
                            <RadioButton.Item label="轻度" value="light" />
                            <RadioButton.Item label="中度" value="medium" />
                            <RadioButton.Item label="重度" value="heavy" />
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>取消</Button>
                        <Button onPress={() => setDialogVisible(false)}>保存</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        margin: 16,
    },
});
