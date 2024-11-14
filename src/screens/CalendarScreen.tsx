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
            dotColor: theme.colors.calendarDot,
            selectedColor: theme.colors.calendarSelected,
        };
        return acc;
    }, {});

    // 如果有选中日期，添加选中状态
    if (selectedDate) {
        markedDates[selectedDate] = {
            ...markedDates[selectedDate],
            selected: true,
            selectedColor: theme.colors.calendarSelected,
        };
    }

    const today = format(new Date(), 'yyyy-MM-dd');
    if (markedDates[today]) {
        markedDates[today] = {
            ...markedDates[today],
            selectedColor: theme.colors.calendarToday,
        };
    } else {
        markedDates[today] = {
            selected: true,
            selectedColor: theme.colors.calendarToday,
        };
    }


    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Calendar
                markedDates={markedDates}
                onDayPress={day => {
                    setSelectedDate(day.dateString);
                    setDialogVisible(true);
                }}
                theme={{
                    backgroundColor: theme.colors.background,
                    calendarBackground: theme.colors.background,
                    textSectionTitleColor: theme.colors.primary,
                    selectedDayBackgroundColor: theme.colors.calendarSelected,
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: theme.colors.primary,
                    todayBackgroundColor: 'transparent',
                    dayTextColor: theme.colors.text,
                    textDisabledColor: theme.colors.placeholder,
                    dotColor: theme.colors.calendarDot,
                    selectedDotColor: '#ffffff',
                    arrowColor: theme.colors.primary,
                    monthTextColor: theme.colors.text,
                    indicatorColor: theme.colors.primary,
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 14,
                    'stylesheet.calendar.header': {
                        week: {
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        },
                        arrow: {
                            padding: 10,
                        },
                        dayHeader: {
                            color: theme.colors.text,
                            fontSize: 14,
                            marginBottom: 10,
                        },
                        monthText: {
                            color: theme.colors.text,
                            fontSize: 16,
                            fontWeight: '600',
                        },
                    },
                }}
                enableSwipeMonths={true}
            />

            <Card
                style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
                mode="outlined"
            >
                <Card.Title
                    title="本月统计"
                    titleStyle={{ color: theme.colors.text }}
                />
                <Card.Content>
                    <Text
                        variant="bodyMedium"
                        style={{ color: theme.colors.text }}
                    >
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
                    <Dialog.Title style={{ color: theme.colors.text }}>
                        添加记录
                    </Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={() => {}} value="">
                            <RadioButton.Item
                                label="轻度"
                                value="light"
                                labelStyle={{ color: theme.colors.text }}
                            />
                            <RadioButton.Item
                                label="中度"
                                value="medium"
                                labelStyle={{ color: theme.colors.text }}
                            />
                            <RadioButton.Item
                                label="重度"
                                value="heavy"
                                labelStyle={{ color: theme.colors.text }}
                            />
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => setDialogVisible(false)}
                            textColor={theme.colors.text}
                        >
                            取消
                        </Button>
                        <Button
                            onPress={() => setDialogVisible(false)}
                            textColor={theme.colors.primary}
                        >
                            保存
                        </Button>
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
        elevation: 2,
    },
});
