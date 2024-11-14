// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { Card, Text, Button, Portal, Dialog, RadioButton, useTheme } from 'react-native-paper';
// import { format } from 'date-fns';
// import { useUsageRecords } from '../hooks/useStorage';
// import { MoodType, SymptomType } from '../types';
//
// export default function CalendarScreen() {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [dialogVisible, setDialogVisible] = useState(false);
//     const { records } = useUsageRecords();
//     const theme = useTheme();
//
//     const markedDates = records.reduce((acc: any, record) => {
//         const dateString = format(new Date(record.timestamp), 'yyyy-MM-dd');
//         acc[dateString] = {
//             marked: true,
//             dotColor: theme.colors.calendarDot,
//             selectedColor: theme.colors.calendarSelected,
//         };
//         return acc;
//     }, {});
//
//     // 如果有选中日期，添加选中状态
//     if (selectedDate) {
//         markedDates[selectedDate] = {
//             ...markedDates[selectedDate],
//             selected: true,
//             selectedColor: theme.colors.calendarSelected,
//         };
//     }
//
//     const today = format(new Date(), 'yyyy-MM-dd');
//     if (markedDates[today]) {
//         markedDates[today] = {
//             ...markedDates[today],
//             selectedColor: theme.colors.calendarToday,
//         };
//     } else {
//         markedDates[today] = {
//             selected: true,
//             selectedColor: theme.colors.calendarToday,
//         };
//     }
//
//
//     return (
//         <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
//             <Calendar
//                 markedDates={markedDates}
//                 onDayPress={day => {
//                     setSelectedDate(day.dateString);
//                     setDialogVisible(true);
//                 }}
//                 theme={{
//                     backgroundColor: theme.colors.background,
//                     calendarBackground: theme.colors.background,
//                     textSectionTitleColor: theme.colors.primary,
//                     selectedDayBackgroundColor: theme.colors.calendarSelected,
//                     selectedDayTextColor: '#ffffff',
//                     // todayTextColor: theme.colors.primary,
//                     todayTextColor: theme.colors.text,
//                     todayBackgroundColor: 'transparent',
//                     dayTextColor: theme.colors.text,
//                     textDisabledColor: theme.colors.placeholder,
//                     dotColor: theme.colors.calendarDot,
//                     selectedDotColor: '#ffffff',
//                     // arrowColor: theme.colors.primary,
//                     arrowColor: theme.colors.text,
//                     monthTextColor: theme.colors.text,
//                     indicatorColor: theme.colors.primary,
//                     textDayFontSize: 16,
//                     textMonthFontSize: 16,
//                     textDayHeaderFontSize: 14,
//                     'stylesheet.calendar.header': {
//                         week: {
//                             marginTop: 5,
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                         },
//                         arrow: {
//                             padding: 10,
//                         },
//                         dayHeader: {
//                             color: theme.colors.text,
//                             fontSize: 14,
//                             marginBottom: 10,
//                         },
//                         monthText: {
//                             color: theme.colors.text,
//                             fontSize: 16,
//                             fontWeight: '600',
//                         },
//                     },
//                 }}
//                 enableSwipeMonths={true}
//             />
//
//             <Card
//                 style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
//                 mode="outlined"
//             >
//                 <Card.Title
//                     title="本月统计"
//                     titleStyle={{ color: theme.colors.text }}
//                 />
//                 <Card.Content>
//                     <Text
//                         variant="bodyMedium"
//                         style={{ color: theme.colors.text }}
//                     >
//                         更换次数: {Object.keys(markedDates).length}
//                     </Text>
//                 </Card.Content>
//             </Card>
//
//             <Portal>
//                 <Dialog
//                     visible={dialogVisible}
//                     onDismiss={() => setDialogVisible(false)}
//                     style={{ backgroundColor: theme.colors.dialogBackground }}
//                 >
//                     <Dialog.Title style={{ color: theme.colors.text }}>
//                         添加记录
//                     </Dialog.Title>
//                     <Dialog.Content>
//                         <RadioButton.Group onValueChange={() => {}} value="">
//                             <RadioButton.Item
//                                 label="轻度"
//                                 value="light"
//                                 labelStyle={{ color: theme.colors.text }}
//                             />
//                             <RadioButton.Item
//                                 label="中度"
//                                 value="medium"
//                                 labelStyle={{ color: theme.colors.text }}
//                             />
//                             <RadioButton.Item
//                                 label="重度"
//                                 value="heavy"
//                                 labelStyle={{ color: theme.colors.text }}
//                             />
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
//                             onPress={() => setDialogVisible(false)}
//                             textColor={theme.colors.primary}
//                         >
//                             保存
//                         </Button>
//                     </Dialog.Actions>
//                 </Dialog>
//             </Portal>
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


import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { Card, Text, Button, Portal, Dialog, RadioButton, Chip, SegmentedButtons, useTheme } from 'react-native-paper';
import { format, addDays } from 'date-fns';
import { useUsageRecords } from '../hooks/useStorage';
import { ProductType, MoodType, SymptomType } from '../types';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const { width: screenWidth } = Dimensions.get('window');

// 周期状态类型
type CycleStatus = 'period' | 'fertile' | 'ovulation' | 'normal';

export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState('');
    const [recordDialogVisible, setRecordDialogVisible] = useState(false);
    const [selectedFlow, setSelectedFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
    const [selectedMood, setSelectedMood] = useState<MoodType>(MoodType.NORMAL);
    const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>([]);
    const { records } = useUsageRecords();
    const theme = useTheme();

    // 计算标记日期
    const markedDates = useMemo(() => {
        const marks: any = {};
        records.forEach(record => {
            const dateString = format(new Date(record.timestamp), 'yyyy-MM-dd');
            const existingMarks = marks[dateString] || {};

            // 根据使用产品类型设置不同颜色
            const dotColor = {
                [ProductType.PAD]: theme.colors.primary,
                [ProductType.TAMPON]: '#FFB6C1',
                [ProductType.CUP]: '#87CEEB',
                [ProductType.DISC]: '#98FB98',
            }[record.productType];

            marks[dateString] = {
                ...existingMarks,
                dots: [...(existingMarks.dots || []), { color: dotColor }],
                marked: true,
            };
        });

        // 如果有选中日期,添加选中状态
        if (selectedDate) {
            marks[selectedDate] = {
                ...marks[selectedDate],
                selected: true,
                selectedColor: theme.colors.primary,
            };
        }

        return marks;
    }, [records, selectedDate, theme]);

    // 渲染心情选择器
    const renderMoodSelector = () => (
        <SegmentedButtons
            value={selectedMood}
            onValueChange={value => setSelectedMood(value as MoodType)}
            buttons={[
                { value: MoodType.HAPPY, icon: 'emoticon-happy', label: '开心' },
                { value: MoodType.NORMAL, icon: 'emoticon-neutral', label: '平静' },
                { value: MoodType.SAD, icon: 'emoticon-sad', label: '低落' },
                { value: MoodType.ANGRY, icon: 'emoticon-angry', label: '烦躁' },
            ]}
        />
    );

    // 渲染症状选择器
    const renderSymptomSelector = () => (
        <View style={styles.symptomsContainer}>
            {Object.entries(SymptomType).map(([key, value]) => (
                <Chip
                    key={key}
                    selected={selectedSymptoms.includes(value)}
                    onPress={() => {
                        setSelectedSymptoms(prev =>
                            prev.includes(value)
                                ? prev.filter(s => s !== value)
                                : [...prev, value]
                        );
                    }}
                    style={styles.symptomChip}
                >
                    {getSymptomLabel(value)}
                </Chip>
            ))}
        </View>
    );

    // 获取症状显示文本
    const getSymptomLabel = (symptom: SymptomType): string => ({
        [SymptomType.CRAMPS]: '痛经',
        [SymptomType.HEADACHE]: '头痛',
        [SymptomType.FATIGUE]: '疲劳',
        [SymptomType.BLOATING]: '胀气',
        [SymptomType.MOOD_SWINGS]: '情绪波动',
        [SymptomType.BREAST_TENDERNESS]: '乳房胀痛',
        [SymptomType.ACNE]: '痘痘',
        [SymptomType.BACKACHE]: '背痛',
    }[symptom]);

    // 渲染经期预测
    const renderPrediction = () => {
        // 这里应该根据历史数据计算下次经期时间
        const predictedDate = addDays(new Date(), 14);
        return (
            <Card style={styles.predictionCard}>
                <Card.Content>
                    <Text variant="titleMedium">经期预测</Text>
                    <View style={styles.predictionContent}>
                        <Icon name="calendar-clock" size={24} color={theme.colors.primary} />
                        <Text variant="bodyLarge" style={styles.predictionText}>
                            预计下次经期: {format(predictedDate, 'MM月dd日')}
                        </Text>
                    </View>
                </Card.Content>
            </Card>
        );
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* 经期预测卡片 */}
            {renderPrediction()}

            {/* 日历组件 */}
            <Calendar
                markingType="multi-dot"
                markedDates={markedDates}
                onDayPress={day => {
                    setSelectedDate(day.dateString);
                    setRecordDialogVisible(true);
                }}
                theme={{
                    backgroundColor: theme.colors.background,
                    calendarBackground: theme.colors.background,
                    textSectionTitleColor: theme.colors.primary,
                    selectedDayBackgroundColor: theme.colors.primary,
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: theme.colors.primary,
                    dayTextColor: theme.colors.text,
                    textDisabledColor: theme.colors.disabled,
                    dotColor: theme.colors.primary,
                    selectedDotColor: '#ffffff',
                    arrowColor: theme.colors.primary,
                    monthTextColor: theme.colors.text,
                    textMonthFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 14,
                }}
            />

            {/* 月度统计卡片 */}
            <Card style={styles.statsCard}>
                <Card.Content>
                    <Text variant="titleMedium" style={styles.statsTitle}>本月统计</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statsItem}>
                            <Text variant="headlineMedium">12</Text>
                            <Text variant="bodyMedium">更换次数</Text>
                        </View>
                        <View style={styles.statsItem}>
                            <Text variant="headlineMedium">5</Text>
                            <Text variant="bodyMedium">经期天数</Text>
                        </View>
                        <View style={styles.statsItem}>
                            <Text variant="headlineMedium">28</Text>
                            <Text variant="bodyMedium">周期天数</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>

            {/* 记录对话框 */}
            <Portal>
                <Dialog
                    visible={recordDialogVisible}
                    onDismiss={() => setRecordDialogVisible(false)}
                    style={{ backgroundColor: theme.colors.surface }}
                >
                    <Dialog.Title>添加记录</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="titleSmall" style={styles.sectionTitle}>经期状况</Text>
                        <RadioButton.Group onValueChange={value => setSelectedFlow(value as any)} value={selectedFlow}>
                            <View style={styles.flowButtons}>
                                <RadioButton.Item label="轻度" value="light" />
                                <RadioButton.Item label="中度" value="medium" />
                                <RadioButton.Item label="重度" value="heavy" />
                            </View>
                        </RadioButton.Group>

                        <Text variant="titleSmall" style={styles.sectionTitle}>心情</Text>
                        {renderMoodSelector()}

                        <Text variant="titleSmall" style={styles.sectionTitle}>症状</Text>
                        {renderSymptomSelector()}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setRecordDialogVisible(false)}>取消</Button>
                        <Button onPress={() => {
                            // 保存记录
                            setRecordDialogVisible(false);
                        }}>保存</Button>
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
    predictionCard: {
        margin: 16,
        elevation: 2,
    },
    predictionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    predictionText: {
        marginLeft: 8,
    },
    statsCard: {
        margin: 16,
        elevation: 2,
    },
    statsTitle: {
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statsItem: {
        alignItems: 'center',
    },
    sectionTitle: {
        marginTop: 16,
        marginBottom: 8,
    },
    flowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    symptomsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    symptomChip: {
        marginRight: 8,
        marginBottom: 8,
    },
});
