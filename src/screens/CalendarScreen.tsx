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
import { createLayoutStyles, createCardStyles } from './styles';

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
