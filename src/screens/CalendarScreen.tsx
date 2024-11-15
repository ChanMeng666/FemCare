// import React, { useState, useCallback, useMemo } from 'react';
// import { View, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
// import { Calendar, DateData } from 'react-native-calendars';
// import { format, addDays, isSameDay } from 'date-fns';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import { Card } from '../components/base/Card';
// import { Typography } from '../components/base/Typography';
// import { Button } from '../components/base/Button';
// import { IconButton } from '../components/base/IconButton';
// import { useTheme } from '../hooks/useTheme';
// import { useUsageRecords } from '../hooks/useStorage';
// import { ProductType, MoodType, SymptomType } from '../types';
// import Animated, {
//     useAnimatedStyle,
//     withSpring,
//     useSharedValue,
//     withTiming,
// } from 'react-native-reanimated';
//
// const { width: SCREEN_WIDTH } = Dimensions.get('window');
//
// const MOOD_ICONS = {
//     [MoodType.HAPPY]: { icon: 'emoticon-happy-outline', label: '开心' },
//     [MoodType.NORMAL]: { icon: 'emoticon-neutral-outline', label: '平静' },
//     [MoodType.SAD]: { icon: 'emoticon-sad-outline', label: '低落' },
//     [MoodType.ANGRY]: { icon: 'emoticon-angry-outline', label: '烦躁' },
//     [MoodType.ANXIOUS]: { icon: 'emoticon-confused-outline', label: '焦虑' },
//     [MoodType.TIRED]: { icon: 'emoticon-sick-outline', label: '疲惫' },
// };
//
// const SYMPTOM_ICONS = {
//     [SymptomType.CRAMPS]: { icon: 'stomach', label: '痛经' },
//     [SymptomType.HEADACHE]: { icon: 'head-flash-outline', label: '头痛' },
//     [SymptomType.FATIGUE]: { icon: 'sleep', label: '疲劳' },
//     [SymptomType.BLOATING]: { icon: 'stomach', label: '胀气' },
//     [SymptomType.MOOD_SWINGS]: { icon: 'emoticon-confused-outline', label: '情绪波动' },
//     [SymptomType.BREAST_TENDERNESS]: { icon: 'heart-flash', label: '乳房胀痛' },
//     [SymptomType.ACNE]: { icon: 'face-woman-outline', label: '痘痘' },
//     [SymptomType.BACKACHE]: { icon: 'human-handsup', label: '背痛' },
// };
//
// export default function CalendarScreen() {
//     const theme = useTheme();
//     const { records } = useUsageRecords();
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedFlow, setSelectedFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
//     const [selectedMood, setSelectedMood] = useState<MoodType>(MoodType.NORMAL);
//     const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>([]);
//
//     // 动画值
//     const bottomSheetPosition = useSharedValue(0);
//     const calendarHeight = useSharedValue(350);
//
//     // 计算日历标记
//     const markedDates = useMemo(() => {
//         const marks: any = {};
//         records.forEach(record => {
//             const dateString = format(new Date(record.timestamp), 'yyyy-MM-dd');
//             const existing = marks[dateString] || { dots: [] };
//
//             // 根据产品类型设置不同颜色的点
//             existing.dots.push({
//                 color: {
//                     [ProductType.PAD]: theme.colors.primary.main,
//                     [ProductType.TAMPON]: theme.colors.secondary.main,
//                     [ProductType.CUP]: theme.colors.success.main,
//                     [ProductType.DISC]: theme.colors.info.main,
//                 }[record.productType],
//             });
//
//             marks[dateString] = {
//                 ...existing,
//                 marked: true,
//             };
//         });
//
//         // 添加选中日期的样式
//         const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
//         marks[selectedDateString] = {
//             ...marks[selectedDateString],
//             selected: true,
//             selectedColor: theme.colors.primary.main,
//         };
//
//         return marks;
//     }, [records, selectedDate, theme]);
//
//     // 渲染预测卡片
//     const renderPredictionCard = () => {
//         const predictedDate = addDays(new Date(), 14); // 这里应该使用实际的预测算法
//
//         return (
//             <Card elevation="md" style={styles.predictionCard}>
//                 <View style={styles.cardHeader}>
//                     <Icon
//                         name="calendar-clock"
//                         size={24}
//                         color={theme.colors.primary.main}
//                     />
//                     <Typography variant="h3" style={styles.cardTitle}>
//                         经期预测
//                     </Typography>
//                 </View>
//
//                 <View style={styles.predictionContent}>
//                     <View style={styles.predictionItem}>
//                         <Typography variant="body1" color={theme.colors.text.secondary}>
//                             预计下次经期
//                         </Typography>
//                         <Typography variant="h2" color={theme.colors.primary.main}>
//                             {format(predictedDate, 'MM月dd日')}
//                         </Typography>
//                     </View>
//
//                     <View style={styles.predictionDivider} />
//
//                     <View style={styles.predictionItem}>
//                         <Typography variant="body1" color={theme.colors.text.secondary}>
//                             距离下次经期
//                         </Typography>
//                         <Typography variant="h2" color={theme.colors.primary.main}>
//                             14天
//                         </Typography>
//                     </View>
//                 </View>
//             </Card>
//         );
//     };
//
//     // 渲染心情选择器
//     const renderMoodSelector = () => {
//         return (
//             <View style={styles.moodContainer}>
//                 {Object.entries(MOOD_ICONS).map(([mood, { icon, label }]) => (
//                     <Pressable
//                         key={mood}
//                         style={[
//                             styles.moodItem,
//                             selectedMood === mood && {
//                                 backgroundColor: `${theme.colors.primary.main}20`,
//                             },
//                         ]}
//                         onPress={() => setSelectedMood(mood as MoodType)}
//                     >
//                         <Icon
//                             name={icon}
//                             size={32}
//                             color={
//                                 selectedMood === mood
//                                     ? theme.colors.primary.main
//                                     : theme.colors.text.secondary
//                             }
//                         />
//                         <Typography
//                             variant="caption"
//                             color={
//                                 selectedMood === mood
//                                     ? theme.colors.primary.main
//                                     : theme.colors.text.secondary
//                             }
//                             style={styles.moodLabel}
//                         >
//                             {label}
//                         </Typography>
//                     </Pressable>
//                 ))}
//             </View>
//         );
//     };
//
//     // 渲染症状选择器
//     const renderSymptomSelector = () => {
//         return (
//             <View style={styles.symptomContainer}>
//                 {Object.entries(SYMPTOM_ICONS).map(([symptom, { icon, label }]) => {
//                     const isSelected = selectedSymptoms.includes(symptom as SymptomType);
//
//                     return (
//                         <Pressable
//                             key={symptom}
//                             style={[
//                                 styles.symptomItem,
//                                 isSelected && {
//                                     backgroundColor: `${theme.colors.primary.main}20`,
//                                 },
//                             ]}
//                             onPress={() => {
//                                 if (isSelected) {
//                                     setSelectedSymptoms(prev =>
//                                         prev.filter(s => s !== symptom)
//                                     );
//                                 } else {
//                                     setSelectedSymptoms(prev => [...prev, symptom as SymptomType]);
//                                 }
//                             }}
//                         >
//                             <Icon
//                                 name={icon}
//                                 size={24}
//                                 color={
//                                     isSelected
//                                         ? theme.colors.primary.main
//                                         : theme.colors.text.secondary
//                                 }
//                             />
//                             <Typography
//                                 variant="caption"
//                                 color={
//                                     isSelected
//                                         ? theme.colors.primary.main
//                                         : theme.colors.text.secondary
//                                 }
//                                 style={styles.symptomLabel}
//                             >
//                                 {label}
//                             </Typography>
//                         </Pressable>
//                     );
//                 })}
//             </View>
//         );
//     };
//
//     // 渲染流量选择器
//     const renderFlowSelector = () => {
//         const flowOptions = [
//             { value: 'light', label: '轻度', icon: 'water-outline' },
//             { value: 'medium', label: '中度', icon: 'water' },
//             { value: 'heavy', label: '重度', icon: 'water-plus' },
//         ];
//
//         return (
//             <View style={styles.flowContainer}>
//                 {flowOptions.map(({ value, label, icon }) => (
//                     <Pressable
//                         key={value}
//                         style={[
//                             styles.flowItem,
//                             selectedFlow === value && {
//                                 backgroundColor: `${theme.colors.primary.main}20`,
//                             },
//                         ]}
//                         onPress={() => setSelectedFlow(value as typeof selectedFlow)}
//                     >
//                         <Icon
//                             name={icon}
//                             size={24}
//                             color={
//                                 selectedFlow === value
//                                     ? theme.colors.primary.main
//                                     : theme.colors.text.secondary
//                             }
//                         />
//                         <Typography
//                             variant="body2"
//                             color={
//                                 selectedFlow === value
//                                     ? theme.colors.primary.main
//                                     : theme.colors.text.secondary
//                             }
//                             style={styles.flowLabel}
//                         >
//                             {label}
//                         </Typography>
//                     </Pressable>
//                 ))}
//             </View>
//         );
//     };
//
//     // 渲染记录面板
//     const recordPanelStyle = useAnimatedStyle(() => {
//         return {
//             transform: [
//                 {
//                     translateY: withSpring(bottomSheetPosition.value),
//                 },
//             ],
//         };
//     });
//
//     return (
//         <View style={[styles.container, { backgroundColor: theme.colors.background.default }]}>
//             <ScrollView style={styles.scrollView}>
//                 {renderPredictionCard()}
//
//                 <Card elevation="sm" style={styles.calendarCard}>
//                     <Calendar
//                         current={format(selectedDate, 'yyyy-MM-dd')}
//                         markedDates={markedDates}
//                         onDayPress={day => {
//                             setSelectedDate(new Date(day.timestamp));
//                             bottomSheetPosition.value = withTiming(-400);
//                         }}
//                         theme={{
//                             backgroundColor: theme.colors.background.paper,
//                             calendarBackground: theme.colors.background.paper,
//                             textSectionTitleColor: theme.colors.text.primary,
//                             selectedDayBackgroundColor: theme.colors.primary.main,
//                             selectedDayTextColor: theme.colors.primary.contrast,
//                             todayTextColor: theme.colors.primary.main,
//                             dayTextColor: theme.colors.text.primary,
//                             textDisabledColor: theme.colors.text.disabled,
//                             dotColor: theme.colors.primary.main,
//                             selectedDotColor: theme.colors.primary.contrast,
//                             arrowColor: theme.colors.primary.main,
//                             monthTextColor: theme.colors.text.primary,
//                             textMonthFontWeight: 'bold',
//                             textDayFontSize: 16,
//                             textMonthFontSize: 16,
//                             textDayHeaderFontSize: 14,
//                         }}
//                     />
//                 </Card>
//
//                 <Card elevation="sm" style={styles.statsCard}>
//                     <Typography variant="h3" style={styles.statsTitle}>
//                         月度统计
//                     </Typography>
//                     <View style={styles.statsGrid}>
//                         <View style={styles.statsItem}>
//                             <Typography variant="h2" color={theme.colors.primary.main}>
//                                 12
//                             </Typography>
//                             <Typography variant="body2" color={theme.colors.text.secondary}>
//                                 更换次数
//                             </Typography>
//                         </View>
//                         <View style={styles.statsItem}>
//                             <Typography variant="h2" color={theme.colors.primary.main}>
//                                 5
//                             </Typography>
//                             <Typography variant="body2" color={theme.colors.text.secondary}>
//                                 经期天数
//                             </Typography>
//                         </View>
//                         <View style={styles.statsItem}>
//                             <Typography variant="h2" color={theme.colors.primary.main}>
//                                 28
//                             </Typography>
//                             <Typography variant="body2" color={theme.colors.text.secondary}>
//                                 周期天数
//                             </Typography>
//                         </View>
//                     </View>
//                 </Card>
//             </ScrollView>
//
//             {/* 记录面板 */}
//             <Animated.View style={[styles.recordPanel, recordPanelStyle]}>
//                 <View style={styles.recordHandle} />
//
//                 <ScrollView style={styles.recordContent}>
//                     <Typography variant="h2" style={styles.recordTitle}>
//                         {format(selectedDate, 'MM月dd日')} 记录
//                     </Typography>
//
//                     <Typography variant="h3" style={styles.sectionTitle}>
//                         经期状况
//                     </Typography>
//                     {renderFlowSelector()}
//
//                     <Typography variant="h3" style={styles.sectionTitle}>
//                         心情
//                     </Typography>
//                     {renderMoodSelector()}
//
//                     <Typography variant="h3" style={styles.sectionTitle}>
//                         症状
//                     </Typography>
//                     {renderSymptomSelector()}
//
//                     <View style={styles.actionButtons}>
//                         <Button
//                             variant="outlined"
//                             onPress={() => {
//                                 bottomSheetPosition.value = withTiming(0);
//                             }}
//                             style={styles.actionButton}
//                         >
//                             取消
//                         </Button>
//                         <Button
//                             onPress={() => {
//                                 // 保存记录
//                                 bottomSheetPosition.value = withTiming(0);
//                             }}
//                             style={styles.actionButton}
//                         >
//                             保存
//                         </Button>
//                     </View>
//                 </ScrollView>
//             </Animated.View>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     scrollView: {
//         flex: 1,
//     },
//     predictionCard: {
//         margin: 16,
//     },
//     cardHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     cardTitle: {
//         marginLeft: 12,
//     },
//     predictionContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//         paddingVertical: 8,
//     },
//     predictionItem: {
//         alignItems: 'center',
//     },
//     predictionDivider: {
//         width: 1,
//         height: 40,
//         backgroundColor: 'rgba(0, 0, 0, 0.1)',
//     },
//     calendarCard: {
//         margin: 16,
//         marginTop: 0,
//     },
//     statsCard: {
//         margin: 16,
//         marginTop: 0,
//     },
//     statsTitle: {
//         marginBottom: 16,
//     },
//     statsGrid: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//     },
//     statsItem: {
//         alignItems: 'center',
//     },
//     recordPanel: {
//         position: 'absolute',
//         bottom: -400,
//         left: 0,
//         right: 0,
//         height: 600,
//         backgroundColor: 'white',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: -2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     recordHandle: {
//         width: 40,
//         height: 4,
//         backgroundColor: '#D1D1D6',
//         borderRadius: 2,
//         alignSelf: 'center',
//         marginTop: 12,
//     },
//     recordContent: {
//         flex: 1,
//         padding: 24,
//     },
//     recordTitle: {
//         marginBottom: 24,
//         textAlign: 'center',
//     },
//     sectionTitle: {
//         marginTop: 24,
//         marginBottom: 16,
//     },
//     flowContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: -8,
//     },
//     flowItem: {
//         flex: 1,
//         alignItems: 'center',
//         padding: 16,
//         margin: 8,
//         borderRadius: 12,
//         backgroundColor: '#F5F5F7',
//     },
//     flowLabel: {
//         marginTop: 8,
//     },
//     moodContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginHorizontal: -8,
//     },
//     moodItem: {
//         width: '25%',
//         alignItems: 'center',
//         padding: 12,
//         margin: 8,
//         borderRadius: 12,
//         backgroundColor: '#F5F5F7',
//     },
//     moodLabel: {
//         marginTop: 8,
//         textAlign: 'center',
//     },
//     symptomContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginHorizontal: -8,
//     },
//     symptomItem: {
//         width: '45%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 12,
//         margin: 8,
//         borderRadius: 12,
//         backgroundColor: '#F5F5F7',
//     },
//     symptomLabel: {
//         marginLeft: 12,
//         flex: 1,
//     },
//     actionButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 32,
//         paddingBottom: 24,
//     },
//     actionButton: {
//         flex: 1,
//         marginHorizontal: 8,
//     },
// });


// src/screens/CalendarScreen.tsx
// import React, { useState } from 'react';
// import { View, ScrollView, Pressable } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import Animated, {
//     useAnimatedStyle,
//     withSpring,
//     useSharedValue,
//     withTiming,
// } from 'react-native-reanimated';
// import { useTheme } from '../hooks/useTheme';
// import { Typography } from '../components/base/Typography';
// import { Card } from '../components/base/Card';
// import { Button } from '../components/base/Button';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import { createCalendarStyles } from './styles/CalendarScreen';
// import { createLayoutStyles, createCardStyles } from './styles/common';
// import {
//     MoodType,
//     SymptomType,
//     MOOD_ICONS,
//     SYMPTOM_ICONS
// } from '../types';
//
// export default function CalendarScreen() {
//     const theme = useTheme();
//     const layoutStyles = createLayoutStyles(theme);
//     const cardStyles = createCardStyles(theme);
//     const styles = createCalendarStyles(theme);
//
//     // 动画值和状态管理
//     const bottomSheetPosition = useSharedValue(0);
//     const calendarHeight = useSharedValue(350);
//
//     // 渲染预测卡片
//     const renderPredictionCard = () => (
//         <Card style={styles.predictionCard}>
//             <View style={cardStyles.cardHeader}>
//                 <Icon
//                     name="calendar-clock"
//                     size={24}
//                     color={theme.colors.primary.main}
//                 />
//                 <Typography variant="h3">经期预测</Typography>
//             </View>
//
//             <View style={styles.predictionContent}>
//                 <View style={styles.predictionItem}>
//                     <Typography variant="body1" color={theme.colors.text.secondary}>
//                         预计下次经期
//                     </Typography>
//                     <Typography
//                         variant="h2"
//                         color={theme.colors.primary.main}
//                         style={styles.predictionValue}
//                     >
//                         {predictedDate}
//                     </Typography>
//                 </View>
//
//                 <View style={styles.predictionDivider} />
//
//                 <View style={styles.predictionItem}>
//                     <Typography variant="body1" color={theme.colors.text.secondary}>
//                         距离下次经期
//                     </Typography>
//                     <Typography
//                         variant="h2"
//                         color={theme.colors.primary.main}
//                         style={styles.predictionValue}
//                     >
//                         14天
//                     </Typography>
//                 </View>
//             </View>
//         </Card>
//     );
//
//     // 渲染日历
//     const renderCalendar = () => (
//         <Card style={styles.calendarCard}>
//             <Calendar
//                 current={selectedDate}
//                 markedDates={markedDates}
//                 onDayPress={handleDayPress}
//                 theme={{
//                     backgroundColor: theme.colors.background.paper,
//                     calendarBackground: theme.colors.background.paper,
//                     textSectionTitleColor: theme.colors.text.primary,
//                     selectedDayBackgroundColor: theme.colors.primary.main,
//                     selectedDayTextColor: theme.colors.primary.contrast,
//                     todayTextColor: theme.colors.primary.main,
//                     dayTextColor: theme.colors.text.primary,
//                     textDisabledColor: theme.colors.text.disabled,
//                     dotColor: theme.colors.primary.main,
//                     selectedDotColor: theme.colors.primary.contrast,
//                     arrowColor: theme.colors.primary.main,
//                     monthTextColor: theme.colors.text.primary,
//                 }}
//             />
//         </Card>
//     );
//
//     // 渲染记录面板
//     const renderRecordPanel = () => {
//         const panelStyle = useAnimatedStyle(() => ({
//             transform: [{ translateY: bottomSheetPosition.value }],
//         }));
//
//         return (
//             <Animated.View style={[styles.recordPanel, panelStyle]}>
//                 <View style={styles.recordHandle} />
//                 <ScrollView style={styles.recordContent}>
//                     <Typography variant="h2" style={styles.recordTitle}>
//                         {selectedDate} 记录
//                     </Typography>
//
//                     {/* 经期状况 */}
//                     <Typography variant="h3" style={styles.sectionTitle}>
//                         经期状况
//                     </Typography>
//                     <View style={styles.flowSelector}>
//                         {flowOptions.map(option => (
//                             <Pressable
//                                 key={option.value}
//                                 style={[
//                                     styles.flowOption,
//                                     selectedFlow === option.value && styles.flowOptionSelected,
//                                 ]}
//                                 onPress={() => setSelectedFlow(option.value)}
//                             >
//                                 <Icon
//                                     name={option.icon}
//                                     size={24}
//                                     color={
//                                         selectedFlow === option.value
//                                             ? theme.colors.primary.contrast
//                                             : theme.colors.primary.main
//                                     }
//                                 />
//                                 <Typography
//                                     variant="body2"
//                                     color={
//                                         selectedFlow === option.value
//                                             ? theme.colors.primary.contrast
//                                             : theme.colors.text.primary
//                                     }
//                                     style={styles.flowLabel}
//                                 >
//                                     {option.label}
//                                 </Typography>
//                             </Pressable>
//                         ))}
//                     </View>
//
//                     {/* 心情选择器 */}
//                     <Typography variant="h3" style={styles.sectionTitle}>
//                         心情
//                     </Typography>
//                     <View style={styles.moodSelector}>
//                         {Object.entries(MOOD_ICONS).map(([mood, { icon, label }]) => (
//                             <Pressable
//                                 key={mood}
//                                 style={[
//                                     styles.moodOption,
//                                     selectedMood === mood && styles.moodOptionSelected,
//                                 ]}
//                                 onPress={() => setSelectedMood(mood as MoodType)}
//                             >
//                                 <Icon
//                                     name={icon}
//                                     size={32}
//                                     color={
//                                         selectedMood === mood
//                                             ? theme.colors.primary.contrast
//                                             : theme.colors.primary.main
//                                     }
//                                 />
//                                 <Typography
//                                     variant="caption"
//                                     color={
//                                         selectedMood === mood
//                                             ? theme.colors.primary.contrast
//                                             : theme.colors.text.primary
//                                     }
//                                     style={styles.moodLabel}
//                                 >
//                                     {label}
//                                 </Typography>
//                             </Pressable>
//                         ))}
//                     </View>
//
//                     {/* 症状选择器 */}
//                     <Typography variant="h3" style={styles.sectionTitle}>
//                         症状
//                     </Typography>
//                     <View style={styles.symptomSelector}>
//                         {Object.entries(SYMPTOM_ICONS).map(([symptom, { icon, label }]) => (
//                             <Pressable
//                                 key={symptom}
//                                 style={[
//                                     styles.symptomOption,
//                                     selectedSymptoms.includes(symptom as SymptomType) &&
//                                     styles.symptomOptionSelected,
//                                 ]}
//                                 onPress={() => handleSymptomToggle(symptom as SymptomType)}
//                             >
//                                 <Icon
//                                     name={icon}
//                                     size={24}
//                                     color={
//                                         selectedSymptoms.includes(symptom as SymptomType)
//                                             ? theme.colors.primary.contrast
//                                             : theme.colors.primary.main
//                                     }
//                                 />
//                                 <Typography
//                                     variant="caption"
//                                     color={
//                                         selectedSymptoms.includes(symptom as SymptomType)
//                                             ? theme.colors.primary.contrast
//                                             : theme.colors.text.primary
//                                     }
//                                     style={styles.symptomLabel}
//                                 >
//                                     {label}
//                                 </Typography>
//                             </Pressable>
//                         ))}
//                     </View>
//
//                     {/* 操作按钮 */}
//                     <View style={styles.actionButtons}>
//                         <Button
//                             variant="outlined"
//                             onPress={handleCancel}
//                             style={styles.actionButton}
//                         >
//                             取消
//                         </Button>
//                         <Button
//                             onPress={handleSave}
//                             style={styles.actionButton}
//                         >
//                             保存
//                         </Button>
//                     </View>
//                 </ScrollView>
//             </Animated.View>
//         );
//     };
//
//     return (
//         <View style={layoutStyles.screen}>
//             <ScrollView style={layoutStyles.scrollViewWithPadding}>
//                 {renderPredictionCard()}
//                 {renderCalendar()}
//             </ScrollView>
//             {renderRecordPanel()}
//         </View>
//     );
// }


// src/screens/CalendarScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Animated, {
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';
import { Typography } from '../components/base/Typography';
import { Card } from '../components/base/Card';
import { Button } from '../components/base/Button';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createCalendarStyles } from './styles';
import { createLayoutStyles, createCardStyles } from './styles/common';

export default function CalendarScreen() {
    const theme = useTheme();
    const layoutStyles = createLayoutStyles(theme);
    const cardStyles = createCardStyles(theme);
    const styles = createCalendarStyles(theme);

    // 动画值和状态管理
    const bottomSheetPosition = useSharedValue(0);
    const calendarHeight = useSharedValue(350);

    // 渲染预测卡片
    const renderPredictionCard = () => (
        <Card style={styles.predictionCard}>
            <View style={cardStyles.cardHeader}>
                <Icon
                    name="calendar-clock"
                    size={24}
                    color={theme.colors.primary.main}
                />
                <Typography variant="h3">经期预测</Typography>
            </View>

            <View style={styles.predictionContent}>
                <View style={styles.predictionItem}>
                    <Typography variant="body1" color={theme.colors.text.secondary}>
                        预计下次经期
                    </Typography>
                    <Typography
                        variant="h2"
                        color={theme.colors.primary.main}
                        style={styles.predictionValue}
                    >
                        {predictedDate}
                    </Typography>
                </View>

                <View style={styles.predictionDivider} />

                <View style={styles.predictionItem}>
                    <Typography variant="body1" color={theme.colors.text.secondary}>
                        距离下次经期
                    </Typography>
                    <Typography
                        variant="h2"
                        color={theme.colors.primary.main}
                        style={styles.predictionValue}
                    >
                        14天
                    </Typography>
                </View>
            </View>
        </Card>
    );

    // 渲染日历
    const renderCalendar = () => (
        <Card style={styles.calendarCard}>
            <Calendar
                current={selectedDate}
                markedDates={markedDates}
                onDayPress={handleDayPress}
                theme={{
                    backgroundColor: theme.colors.background.paper,
                    calendarBackground: theme.colors.background.paper,
                    textSectionTitleColor: theme.colors.text.primary,
                    selectedDayBackgroundColor: theme.colors.primary.main,
                    selectedDayTextColor: theme.colors.primary.contrast,
                    todayTextColor: theme.colors.primary.main,
                    dayTextColor: theme.colors.text.primary,
                    textDisabledColor: theme.colors.text.disabled,
                    dotColor: theme.colors.primary.main,
                    selectedDotColor: theme.colors.primary.contrast,
                    arrowColor: theme.colors.primary.main,
                    monthTextColor: theme.colors.text.primary,
                }}
            />
        </Card>
    );

    // 渲染记录面板
    const recordPanelStyle = useAnimatedStyle(() => ({
        transform: [{
            translateY: withSpring(bottomSheetPosition.value)
        }],
    }));

    return (
        <View style={layoutStyles.screen}>
            <ScrollView style={layoutStyles.scrollViewWithPadding}>
                {/* 预测卡片 */}
                <Card style={styles.predictionCard}>
                    <View style={cardStyles.cardHeader}>
                        <Icon name="calendar-clock" size={24} color={theme.colors.primary.main} />
                        <Typography variant="h3">经期预测</Typography>
                    </View>
                    <View style={styles.predictionContent}>
                        <View style={styles.predictionItem}>
                            <Typography variant="body1" color={theme.colors.text.secondary}>
                                预计下次经期
                            </Typography>
                            <Typography variant="h2" color={theme.colors.primary.main}>
                                {predictedDate}
                            </Typography>
                        </View>
                        <View style={styles.predictionDivider} />
                        <View style={styles.predictionItem}>
                            <Typography variant="body1" color={theme.colors.text.secondary}>
                                距离下次经期
                            </Typography>
                            <Typography variant="h2" color={theme.colors.primary.main}>
                                {daysUntilNext}天
                            </Typography>
                        </View>
                    </View>
                </Card>

                {/* 日历区域 */}
                <Card style={styles.calendarCard}>
                    <Calendar
                        markedDates={markedDates}
                        theme={{
                            backgroundColor: theme.colors.background.paper,
                            calendarBackground: theme.colors.background.paper,
                            textSectionTitleColor: theme.colors.text.primary,
                            selectedDayBackgroundColor: theme.colors.primary.main,
                            selectedDayTextColor: theme.colors.primary.contrast,
                            todayTextColor: theme.colors.primary.main,
                            dayTextColor: theme.colors.text.primary,
                            textDisabledColor: theme.colors.text.disabled,
                            dotColor: theme.colors.primary.main,
                            selectedDotColor: theme.colors.primary.contrast,
                            arrowColor: theme.colors.primary.main,
                            monthTextColor: theme.colors.text.primary,
                        }}
                        // ... 其他 Calendar 属性保持不变
                    />
                </Card>

                {/* 记录面板 */}
                <Animated.View style={[styles.recordPanel, recordPanelStyle]}>
                    <View style={styles.recordHandle} />
                    <ScrollView style={styles.recordContent}>
                        <Typography variant="h2" style={styles.recordTitle}>
                            {selectedDate} 记录
                        </Typography>

                        {/* 经期状况选择器 */}
                        <Typography variant="h3" style={styles.sectionTitle}>
                            经期状况
                        </Typography>
                        <View style={styles.flowSelector}>
                            {flowOptions.map(option => (
                                <Pressable
                                    key={option.value}
                                    style={[
                                        styles.flowOption,
                                        selectedFlow === option.value && styles.flowOptionSelected
                                    ]}
                                    onPress={() => setSelectedFlow(option.value)}
                                >
                                    <Icon
                                        name={option.icon}
                                        size={24}
                                        color={selectedFlow === option.value
                                            ? theme.colors.primary.contrast
                                            : theme.colors.primary.main}
                                    />
                                    <Typography
                                        variant="body2"
                                        color={selectedFlow === option.value
                                            ? theme.colors.primary.contrast
                                            : theme.colors.text.primary}
                                        style={styles.optionLabel}
                                    >
                                        {option.label}
                                    </Typography>
                                </Pressable>
                            ))}
                        </View>

                        {/* 心情选择器 */}
                        <Typography variant="h3" style={styles.sectionTitle}>
                            心情
                        </Typography>
                        <View style={styles.moodSelector}>
                            {Object.entries(MOOD_ICONS).map(([mood, { icon, label }]) => (
                                <Pressable
                                    key={mood}
                                    style={[
                                        styles.moodOption,
                                        selectedMood === mood && styles.moodOptionSelected,
                                    ]}
                                    onPress={() => setSelectedMood(mood as MoodType)}
                                >
                                    <Icon
                                        name={icon}
                                        size={32}
                                        color={
                                            selectedMood === mood
                                                ? theme.colors.primary.contrast
                                                : theme.colors.primary.main
                                        }
                                    />
                                    <Typography
                                        variant="caption"
                                        color={
                                            selectedMood === mood
                                                ? theme.colors.primary.contrast
                                                : theme.colors.text.primary
                                        }
                                        style={styles.moodLabel}
                                    >
                                        {label}
                                    </Typography>
                                </Pressable>
                            ))}
                        </View>


                        {/* 症状选择器 */}
                        <Typography variant="h3" style={styles.sectionTitle}>
                            症状
                        </Typography>
                        <View style={styles.symptomSelector}>
                            {Object.entries(SYMPTOM_ICONS).map(([symptom, { icon, label }]) => (
                                <Pressable
                                    key={symptom}
                                    style={[
                                        styles.symptomOption,
                                        selectedSymptoms.includes(symptom as SymptomType) &&
                                        styles.symptomOptionSelected,
                                    ]}
                                    onPress={() => handleSymptomToggle(symptom as SymptomType)}
                                >
                                    <Icon
                                        name={icon}
                                        size={24}
                                        color={
                                            selectedSymptoms.includes(symptom as SymptomType)
                                                ? theme.colors.primary.contrast
                                                : theme.colors.primary.main
                                        }
                                    />
                                    <Typography
                                        variant="caption"
                                        color={
                                            selectedSymptoms.includes(symptom as SymptomType)
                                                ? theme.colors.primary.contrast
                                                : theme.colors.text.primary
                                        }
                                        style={styles.symptomLabel}
                                    >
                                        {label}
                                    </Typography>
                                </Pressable>
                            ))}
                        </View>


                        {/* 操作按钮 */}
                        <View style={styles.actionButtons}>
                            <Button
                                variant="outlined"
                                onPress={handleCancel}
                                style={styles.actionButton}
                            >
                                取消
                            </Button>
                            <Button
                                onPress={handleSave}
                                style={styles.actionButton}
                            >
                                保存
                            </Button>
                        </View>
                    </ScrollView>
                </Animated.View>
            </ScrollView>
        </View>
    );
}
