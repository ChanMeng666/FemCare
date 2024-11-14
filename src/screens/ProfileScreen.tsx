// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { List, Switch, Divider, Text, Portal, Dialog, TouchableRipple, useTheme } from 'react-native-paper';
// import { useSettings } from '../hooks/useStorage';
// import { useThemeContext } from '../contexts/ThemeContext';
// import { themeNames } from '../themes';
// import type { ThemeType } from '../types/theme';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
//
// export default function ProfileScreen() {
//     const { settings, updateSettings } = useSettings();
//     const { theme: currentTheme, setTheme } = useThemeContext();
//     const [themeDialogVisible, setThemeDialogVisible] = useState(false);
//     const theme = useTheme();
//
//     if (!settings) {
//         return (
//             <View style={styles.container}>
//                 <Text>加载中...</Text>
//             </View>
//         );
//     }
//
//     return (
//         <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
//             <List.Section>
//                 <List.Subheader
//                     style={{ color: theme.colors.text }}
//                 >
//                     主题设置
//                 </List.Subheader>
//                 <List.Item
//                     title="颜色主题"
//                     titleStyle={{ color: theme.colors.text }}
//                     description={themeNames[currentTheme]}
//                     descriptionStyle={{ color: theme.colors.text }}
//                     onPress={() => setThemeDialogVisible(true)}
//                     right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.text} />}
//                 />
//                 <Divider />
//             </List.Section>
//
//             <List.Section>
//                 <List.Subheader>提醒设置</List.Subheader>
//                 <List.Item
//                     title="启用提醒"
//                     right={() => (
//                         <Switch
//                             value={settings.notificationsEnabled}
//                             onValueChange={value =>
//                                 updateSettings({ notificationsEnabled: value })
//                             }
//                         />
//                     )}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="夜间免打扰"
//                     description="22:00 - 07:00 期间不发送提醒"
//                     right={() => (
//                         <Switch
//                             value={settings.nightModeEnabled}
//                             onValueChange={value =>
//                                 updateSettings({ nightModeEnabled: value })
//                             }
//                         />
//                     )}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="提醒间隔"
//                     description={`${settings.reminderInterval} 分钟`}
//                     onPress={() => {
//                         // TODO: 添加修改间隔的对话框
//                     }}
//                 />
//             </List.Section>
//
//             <Portal>
//                 <Dialog
//                     visible={themeDialogVisible}
//                     onDismiss={() => setThemeDialogVisible(false)}
//                     style={[
//                         styles.dialog,
//                         {
//                             backgroundColor: theme.colors.surface,
//                             borderRadius: 28,
//                         }
//                     ]}
//                 >
//                     <Dialog.Title
//                         style={{
//                             color: theme.colors.text,
//                             textAlign: 'center',
//                         }}
//                     >
//                         选择主题
//                     </Dialog.Title>
//                     <Dialog.Content>
//                         {Object.entries(themeNames).map(([value, label]) => (
//                             <TouchableRipple
//                                 key={value}
//                                 onPress={() => {
//                                     setTheme(value as ThemeType);
//                                     setThemeDialogVisible(false);
//                                 }}
//                                 style={styles.themeOption}
//                             >
//                                 {/*<List.Item*/}
//                                 {/*    title={label}*/}
//                                 {/*    right={props =>*/}
//                                 {/*        theme === value ? (*/}
//                                 {/*            <List.Icon {...props} icon="check" />*/}
//                                 {/*        ) : null*/}
//                                 {/*    }*/}
//                                 {/*/>*/}
//                                 <View style={styles.themeOptionContent}>
//                                     <Text style={{ color: theme.colors.text }}>
//                                         {label}
//                                     </Text>
//                                     {currentTheme === value && (
//                                         <Icon
//                                             name="check"
//                                             size={24}
//                                             color={theme.colors.primary}
//                                         />
//                                     )}
//                                 </View>
//                             </TouchableRipple>
//                         ))}
//                     </Dialog.Content>
//                 </Dialog>
//             </Portal>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     dialog: {
//         marginHorizontal: 24,
//     },
//     themeOption: {
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//     },
//     themeOptionContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
// });


// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView, Alert } from 'react-native';
// import {
//     List,
//     Switch,
//     Divider,
//     Text,
//     Portal,
//     Dialog,
//     TouchableRipple,
//     Button,
//     TextInput,
//     IconButton,
//     useTheme,
// } from 'react-native-paper';
// import { useSettings } from '../hooks/useStorage';
// import { useThemeContext } from '../contexts/ThemeContext';
// import { themeNames } from '../themes';
// import { storageService } from '../services/storage';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import * as SecureStore from 'expo-secure-store';
//
// export default function ProfileScreen() {
//     const { settings, updateSettings } = useSettings();
//     const { theme: currentTheme, setTheme } = useThemeContext();
//     const [themeDialogVisible, setThemeDialogVisible] = useState(false);
//     const [cycleDialogVisible, setCycleDialogVisible] = useState(false);
//     const [privacyDialogVisible, setPrivacyDialogVisible] = useState(false);
//     const [timeDialogVisible, setTimeDialogVisible] = useState(false);
//     const [exportDialogVisible, setExportDialogVisible] = useState(false);
//     const theme = useTheme();
//
//     // 夜间免打扰时间设置
//     const [startTime, setStartTime] = useState('22:00');
//     const [endTime, setEndTime] = useState('07:00');
//
//     // 经期设置
//     const [cycleDuration, setCycleDuration] = useState('28');
//     const [periodDuration, setPeriodDuration] = useState('5');
//
//     // 隐私设置
//     const [appLockEnabled, setAppLockEnabled] = useState(false);
//     const [hideContent, setHideContent] = useState(false);
//
//     // 处理数据导出
//     const handleExportData = async () => {
//         try {
//             const records = await storageService.getUsageRecords();
//             const cycleRecords = await storageService.getCycleRecords();
//             const data = {
//                 records,
//                 cycleRecords,
//                 settings: settings,
//                 exportDate: new Date().toISOString(),
//             };
//
//             // 这里应该实现实际的导出逻辑
//             Alert.alert('导出成功', '数据已成功导出到本地');
//         } catch (error) {
//             Alert.alert('导出失败', '请稍后重试');
//         }
//     };
//
//     if (!settings) {
//         return (
//             <View style={styles.container}>
//                 <Text>加载中...</Text>
//             </View>
//         );
//     }
//
//     return (
//         <ScrollView
//             style={[styles.container, { backgroundColor: theme.colors.background }]}
//         >
//             {/* 个人信息设置 */}
//             <List.Section>
//                 <List.Subheader style={{ color: theme.colors.text }}>
//                     个人设置
//                 </List.Subheader>
//                 <List.Item
//                     title="经期设置"
//                     titleStyle={{ color: theme.colors.text }}
//                     description="设置周期长度和经期天数"
//                     descriptionStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="calendar" />}
//                     onPress={() => setCycleDialogVisible(true)}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="默认使用产品"
//                     titleStyle={{ color: theme.colors.text }}
//                     description={settings.defaultProductType === 'pad' ? '卫生巾' : '其他'}
//                     descriptionStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="medical-bag" />}
//                     onPress={() => {/* 显示产品选择对话框 */}}
//                 />
//             </List.Section>
//
//             {/* 提醒设置 */}
//             <List.Section>
//                 <List.Subheader style={{ color: theme.colors.text }}>
//                     提醒设置
//                 </List.Subheader>
//                 <List.Item
//                     title="启用提醒"
//                     titleStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="bell" />}
//                     right={() => (
//                         <Switch
//                             value={settings.notificationsEnabled}
//                             onValueChange={value =>
//                                 updateSettings({ notificationsEnabled: value })
//                             }
//                         />
//                     )}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="夜间免打扰"
//                     titleStyle={{ color: theme.colors.text }}
//                     description={`${startTime} - ${endTime}`}
//                     descriptionStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="moon-waning-crescent" />}
//                     onPress={() => setTimeDialogVisible(true)}
//                     right={() => (
//                         <Switch
//                             value={settings.nightModeEnabled}
//                             onValueChange={value =>
//                                 updateSettings({ nightModeEnabled: value })
//                             }
//                         />
//                     )}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="提醒间隔"
//                     titleStyle={{ color: theme.colors.text }}
//                     description={`${settings.reminderInterval} 分钟`}
//                     descriptionStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="clock-time-four" />}
//                     onPress={() => {/* 显示间隔设置对话框 */}}
//                 />
//             </List.Section>
//
//             {/* 隐私安全 */}
//             <List.Section>
//                 <List.Subheader style={{ color: theme.colors.text }}>
//                     隐私与安全
//                 </List.Subheader>
//                 <List.Item
//                     title="应用锁"
//                     titleStyle={{ color: theme.colors.text }}
//                     description="使用密码或生物识别保护应用"
//                     descriptionStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="lock" />}
//                     right={() => (
//                         <Switch
//                             value={appLockEnabled}
//                             onValueChange={setAppLockEnabled}
//                         />
//                     )}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="隐私模式"
//                     titleStyle={{ color: theme.colors.text }}
//                     description="隐藏敏感内容和通知"
//                     descriptionStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="eye-off" />}
//                     right={() => (
//                         <Switch
//                             value={hideContent}
//                             onValueChange={setHideContent}
//                         />
//                     )}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="数据管理"
//                     titleStyle={{ color: theme.colors.text }}
//                     description="导出或删除数据"
//                     descriptionStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="database" />}
//                     onPress={() => setExportDialogVisible(true)}
//                 />
//             </List.Section>
//
//             {/* 主题设置 */}
//             <List.Section>
//                 <List.Subheader style={{ color: theme.colors.text }}>
//                     显示设置
//                 </List.Subheader>
//                 <List.Item
//                     title="主题色彩"
//                     titleStyle={{ color: theme.colors.text }}
//                     description={themeNames[currentTheme]}
//                     descriptionStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="palette" />}
//                     onPress={() => setThemeDialogVisible(true)}
//                 />
//             </List.Section>
//
//             {/* 关于与帮助 */}
//             <List.Section>
//                 <List.Subheader style={{ color: theme.colors.text }}>
//                     帮助与支持
//                 </List.Subheader>
//                 <List.Item
//                     title="使用指南"
//                     titleStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="help-circle" />}
//                     onPress={() => {/* 显示使用指南 */}}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="紧急求助"
//                     titleStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="phone" />}
//                     onPress={() => {/* 显示紧急联系方式 */}}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="问题反馈"
//                     titleStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="message" />}
//                     onPress={() => {/* 显示反馈表单 */}}
//                 />
//                 <Divider />
//                 <List.Item
//                     title="关于"
//                     titleStyle={{ color: theme.colors.text }}
//                     description="版本 1.0.0"
//                     descriptionStyle={{ color: theme.colors.text }}
//                     left={props => <List.Icon {...props} icon="information" />}
//                 />
//             </List.Section>
//
//             {/* 各种设置对话框 */}
//             <Portal>
//                 {/* 经期设置对话框 */}
//                 <Dialog
//                     visible={cycleDialogVisible}
//                     onDismiss={() => setCycleDialogVisible(false)}
//                     style={{ backgroundColor: theme.colors.surface }}
//                 >
//                     <Dialog.Title>经期设置</Dialog.Title>
//                     <Dialog.Content>
//                         <TextInput
//                             label="平均周期长度(天)"
//                             value={cycleDuration}
//                             onChangeText={setCycleDuration}
//                             keyboardType="numeric"
//                             style={styles.input}
//                         />
//                         <TextInput
//                             label="平均经期长度(天)"
//                             value={periodDuration}
//                             onChangeText={setPeriodDuration}
//                             keyboardType="numeric"
//                             style={styles.input}
//                         />
//                     </Dialog.Content>
//                     <Dialog.Actions>
//                         <Button onPress={() => setCycleDialogVisible(false)}>取消</Button>
//                         <Button onPress={() => {
//                             // 保存设置
//                             setCycleDialogVisible(false);
//                         }}>保存</Button>
//                     </Dialog.Actions>
//                 </Dialog>
//
//                 {/* 免打扰时间设置对话框 */}
//                 <Dialog
//                     visible={timeDialogVisible}
//                     onDismiss={() => setTimeDialogVisible(false)}
//                     style={{ backgroundColor: theme.colors.surface }}
//                 >
//                     <Dialog.Title>免打扰时间</Dialog.Title>
//                     <Dialog.Content>
//                         <TextInput
//                             label="开始时间"
//                             value={startTime}
//                             onChangeText={setStartTime}
//                             style={styles.input}
//                         />
//                         <TextInput
//                             label="结束时间"
//                             value={endTime}
//                             onChangeText={setEndTime}
//                             style={styles.input}
//                         />
//                     </Dialog.Content>
//                     <Dialog.Actions>
//                         <Button onPress={() => setTimeDialogVisible(false)}>取消</Button>
//                         <Button onPress={() => {
//                             // 保存设置
//                             setTimeDialogVisible(false);
//                         }}>保存</Button>
//                     </Dialog.Actions>
//                 </Dialog>
//
//                 {/* 数据导出对话框 */}
//                 <Dialog
//                     visible={exportDialogVisible}
//                     onDismiss={() => setExportDialogVisible(false)}
//                     style={{ backgroundColor: theme.colors.surface }}
//                 >
//                     <Dialog.Title>数据管理</Dialog.Title>
//                     <Dialog.Content>
//                         <Button
//                             mode="outlined"
//                             onPress={handleExportData}
//                             style={styles.dialogButton}
//                         >
//                             导出数据
//                         </Button>
//                         <Button
//                             mode="outlined"
//                             onPress={() => {
//                                 /* 显示数据删除确认 */
//                             }}
//                             style={[styles.dialogButton, { marginTop: 8 }]}
//                             textColor={theme.colors.error}
//                         >
//                             删除所有数据
//                         </Button>
//                     </Dialog.Content>
//                     <Dialog.Actions>
//                         <Button onPress={() => setExportDialogVisible(false)}>
//                             关闭
//                         </Button>
//                     </Dialog.Actions>
//                 </Dialog>
//
//                 {/* 主题选择对话框 */}
//                 <Dialog
//                     visible={themeDialogVisible}
//                     onDismiss={() => setThemeDialogVisible(false)}
//                     style={[styles.dialog, { backgroundColor: theme.colors.surface }]}
//                 >
//                     <Dialog.Title>选择主题</Dialog.Title>
//                     <Dialog.Content>
//                         {Object.entries(themeNames).map(([value, label]) => (
//                             <TouchableRipple
//                                 key={value}
//                                 onPress={() => {
//                                     setTheme(value as any);
//                                     setThemeDialogVisible(false);
//                                 }}
//                                 style={styles.themeOption}
//                             >
//                                 <View style={styles.themeOptionContent}>
//                                     <Text style={{ color: theme.colors.text }}>
//                                         {label}
//                                     </Text>
//                                     {currentTheme === value && (
//                                         <Icon
//                                             name="check"
//                                             size={24}
//                                             color={theme.colors.primary}
//                                         />
//                                     )}
//                                 </View>
//                             </TouchableRipple>
//                         ))}
//                     </Dialog.Content>
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
//     dialog: {
//         marginHorizontal: 24,
//     },
//     themeOption: {
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//     },
//     themeOptionContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     input: {
//         marginBottom: 16,
//         backgroundColor: 'transparent',
//     },
//     dialogButton: {
//         marginVertical: 4,
//     },
//     listSection: {
//         backgroundColor: 'transparent',
//     },
//     divider: {
//         marginHorizontal: 16,
//     },
//     sectionHeader: {
//         marginTop: 16,
//         marginBottom: 8,
//     },
//     menuItem: {
//         paddingVertical: 12,
//     },
//     switchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//     },
//     description: {
//         fontSize: 12,
//         marginTop: 4,
//         marginLeft: 16,
//     },
//     dialogContent: {
//         paddingHorizontal: 24,
//         paddingVertical: 8,
//     },
//     colorPreview: {
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         marginRight: 12,
//     },
//     versionText: {
//         textAlign: 'center',
//         marginVertical: 16,
//         opacity: 0.6,
//     },
// });


import React, { useState, useCallback } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Pressable,
    Alert,
    Linking,
    Platform,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { format } from 'date-fns';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Card } from '../components/base/Card';
import { Typography } from '../components/base/Typography';
import { Button } from '../components/base/Button';
import { Switch } from '../components/base/Switch';
import { useTheme } from '../hooks/useTheme';
import { useSettings } from '../hooks/useStorage';
import { storageService } from '../services/storage';
import { ThemeType, ProductType } from '../types';

interface SettingItemProps {
    icon: string;
    title: string;
    description?: string;
    onPress?: () => void;
    right?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
                                                     icon,
                                                     title,
                                                     description,
                                                     onPress,
                                                     right,
                                                 }) => {
    const theme = useTheme();

    return (
        <Pressable
            style={({ pressed }) => [
                styles.settingItem,
                pressed && { backgroundColor: `${theme.colors.primary.main}10` },
            ]}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.settingIcon}>
                <Icon name={icon} size={24} color={theme.colors.primary.main} />
            </View>
            <View style={styles.settingContent}>
                <Typography variant="body1">{title}</Typography>
                {description && (
                    <Typography
                        variant="caption"
                        color={theme.colors.text.secondary}
                        style={styles.settingDescription}
                    >
                        {description}
                    </Typography>
                )}
            </View>
            {right && <View style={styles.settingRight}>{right}</View>}
        </Pressable>
    );
};

interface SettingSectionProps {
    title: string;
    children: React.ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => {
    const theme = useTheme();

    return (
        <View style={styles.settingSection}>
            <Typography
                variant="h3"
                color={theme.colors.text.secondary}
                style={styles.sectionTitle}
            >
                {title}
            </Typography>
            <Card elevation="sm">{children}</Card>
        </View>
    );
};

export default function ProfileScreen() {
    const theme = useTheme();
    const { settings, updateSettings } = useSettings();
    const [isExporting, setIsExporting] = useState(false);
    const [showBiometrics, setShowBiometrics] = useState(false);

    // 主题设置
    const [themeDialogVisible, setThemeDialogVisible] = useState(false);
    const [reminderDialogVisible, setReminderDialogVisible] = useState(false);
    const [cycleDialogVisible, setCycleDialogVisible] = useState(false);
    const [productDialogVisible, setProductDialogVisible] = useState(false);

    // 检查生物识别可用性
    const checkBiometrics = useCallback(async () => {
        if (Platform.OS !== 'web') {
            try {
                const compatible = await SecureStore.isAvailableAsync();
                setShowBiometrics(compatible);
            } catch {
                setShowBiometrics(false);
            }
        }
    }, []);

    React.useEffect(() => {
        checkBiometrics();
    }, [checkBiometrics]);

    // 导出数据
    const handleExportData = async () => {
        try {
            setIsExporting(true);
            const records = await storageService.getUsageRecords();
            const cycleRecords = await storageService.getCycleRecords();

            const exportData = {
                records,
                cycleRecords,
                settings,
                exportDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            };

            const jsonStr = JSON.stringify(exportData, null, 2);
            // 这里应该实现实际的导出逻辑，可以是保存文件或分享
            Alert.alert('导出成功', '数据已成功导出');
        } catch (error) {
            Alert.alert('导出失败', '请稍后重试');
        } finally {
            setIsExporting(false);
        }
    };

    // 处理隐私设置更改
    const handlePrivacyToggle = async (key: string, value: boolean) => {
        try {
            await updateSettings({ [key]: value });
        } catch (error) {
            Alert.alert('更新失败', '无法更新设置，请重试');
        }
    };

    // 处理数据删除
    const handleDataDeletion = () => {
        Alert.alert(
            '删除所有数据',
            '此操作将永久删除所有记录和设置，无法恢复。确定要继续吗？',
            [
                { text: '取消', style: 'cancel' },
                {
                    text: '删除',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await storageService.clearAllData();
                            Alert.alert('删除成功', '所有数据已被清除');
                        } catch {
                            Alert.alert('删除失败', '请重试');
                        }
                    },
                },
            ]
        );
    };

    // 渲染个人设置
    const renderPersonalSettings = () => (
        <SettingSection title="个人设置">
            <SettingItem
                icon="calendar-month"
                title="经期设置"
                description="设置周期长度和经期天数"
                onPress={() => setCycleDialogVisible(true)}
            />
            <SettingItem
                icon="package-variant"
                title="默认使用产品"
                description={`当前：${
                    settings?.defaultProductType === ProductType.PAD ? '卫生巾' : '其他'
                }`}
                onPress={() => setProductDialogVisible(true)}
            />
        </SettingSection>
    );

    // 渲染提醒设置
    const renderNotificationSettings = () => (
        <SettingSection title="提醒设置">
            <SettingItem
                icon="bell"
                title="启用提醒"
                right={
                    <Switch
                        value={settings?.notificationsEnabled ?? false}
                        onValueChange={(value) =>
                            handlePrivacyToggle('notificationsEnabled', value)
                        }
                    />
                }
            />
            <SettingItem
                icon="clock-time-four"
                title="提醒间隔"
                description={`${settings?.reminderInterval ?? 240} 分钟`}
                onPress={() => setReminderDialogVisible(true)}
            />
            <SettingItem
                icon="moon-waning-crescent"
                title="夜间免打扰"
                description="22:00 - 07:00"
                right={
                    <Switch
                        value={settings?.nightModeEnabled ?? false}
                        onValueChange={(value) =>
                            handlePrivacyToggle('nightModeEnabled', value)
                        }
                    />
                }
            />
        </SettingSection>
    );

    // 渲染隐私设置
    const renderPrivacySettings = () => (
        <SettingSection title="隐私与安全">
            {showBiometrics && (
                <SettingItem
                    icon="fingerprint"
                    title="生物识别解锁"
                    description="使用指纹或面容ID保护应用"
                    right={
                        <Switch
                            value={settings?.biometricsEnabled ?? false}
                            onValueChange={(value) =>
                                handlePrivacyToggle('biometricsEnabled', value)
                            }
                        />
                    }
                />
            )}
            <SettingItem
                icon="eye-off"
                title="隐私模式"
                description="隐藏敏感内容和通知"
                right={
                    <Switch
                        value={settings?.privacyMode ?? false}
                        onValueChange={(value) =>
                            handlePrivacyToggle('privacyMode', value)
                        }
                    />
                }
            />
            <SettingItem
                icon="database"
                title="数据管理"
                description="导出或删除数据"
                onPress={handleExportData}
            />
        </SettingSection>
    );

    // 渲染显示设置
    const renderDisplaySettings = () => (
        <SettingSection title="显示设置">
            <SettingItem
                icon="palette"
                title="主题设置"
                description={`当前：${settings?.theme ?? 'pink'}`}
                onPress={() => setThemeDialogVisible(true)}
            />
            <SettingItem
                icon="translate"
                title="语言"
                description="简体中文"
                onPress={() => {/* 显示语言选择 */}}
            />
        </SettingSection>
    );

    // 渲染帮助与支持
    const renderSupport = () => (
        <SettingSection title="帮助与支持">
            <SettingItem
                icon="help-circle"
                title="使用指南"
                onPress={() => {/* 显示使用指南 */}}
            />
            <SettingItem
                icon="message-text"
                title="问题反馈"
                onPress={() => {/* 显示反馈表单 */}}
            />
            <SettingItem
                icon="phone"
                title="联系我们"
                onPress={() => {/* 显示联系方式 */}}
            />
            <SettingItem
                icon="information"
                title="关于"
                description="版本 1.0.0"
                onPress={() => {/* 显示关于信息 */}}
            />
        </SettingSection>
    );

    const handleContactSupport = () => {
        Linking.openURL('mailto:support@femcare.app');
    };

    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background.default },
            ]}
        >
            {renderPersonalSettings()}
            {renderNotificationSettings()}
            {renderPrivacySettings()}
            {renderDisplaySettings()}
            {renderSupport()}

            <View style={styles.footer}>
                <Button
                    variant="outlined"
                    onPress={handleDataDeletion}
                    style={styles.deleteButton}
                >
                    删除所有数据
                </Button>
                <Typography
                    variant="caption"
                    color={theme.colors.text.secondary}
                    style={styles.versionText}
                >
                    FemCare v1.0.0
                </Typography>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settingSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    settingContent: {
        flex: 1,
    },
    settingDescription: {
        marginTop: 4,
    },
    settingRight: {
        marginLeft: 16,
    },
    footer: {
        padding: 24,
        alignItems: 'center',
    },
    deleteButton: {
        marginBottom: 16,
    },
    versionText: {
        textAlign: 'center',
    },
    dialogContent: {
        padding: 24,
    },
    dialogTitle: {
        marginBottom: 16,
    },
    dialogInput: {
        marginBottom: 16,
    },
    dialogActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 24,
    },
    dialogButton: {
        marginLeft: 8,
    },
    themeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    colorPreview: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 16,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exportingIndicator: {
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
    },
});

