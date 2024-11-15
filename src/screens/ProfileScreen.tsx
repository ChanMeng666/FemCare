import React from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Typography } from '../components/base/Typography';
import { Card } from '../components/base/Card';
import { Button } from '../components/base/Button';
import { Switch } from '../components/base/Switch';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { createProfileStyles } from './styles';
import { createLayoutStyles, createCardStyles } from './styles/common';
import { useSettings } from '../hooks/useStorage';

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
    const styles = createProfileStyles(theme);

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
                <Icon
                    name={icon}
                    size={24}
                    color={theme.colors.primary.main}
                />
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
    const styles = createProfileStyles(theme);

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
    const layoutStyles = createLayoutStyles(theme);
    const styles = createProfileStyles(theme);
    const { settings, updateSettings } = useSettings();

    const handleSettingToggle = async (key: string, value: boolean) => {
        try {
            await updateSettings({ [key]: value });
        } catch (error) {
            Alert.alert('更新失败', '无法更新设置，请重试');
        }
    };

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

    return (
        <ScrollView style={[layoutStyles.screen, layoutStyles.scrollViewWithPadding]}>
            {/* 个人设置 */}
            <SettingSection title="个人设置">
                <SettingItem
                    icon="calendar-month"
                    title="经期设置"
                    description="设置周期长度和经期天数"
                    onPress={handleCycleSettings}
                />
                <SettingItem
                    icon="package-variant"
                    title="默认使用产品"
                    description={`当前：${getProductTypeLabel(settings?.defaultProductType)}`}
                    onPress={handleProductSettings}
                />
            </SettingSection>

            {/* 提醒设置 */}
            <SettingSection title="提醒设置">
                <SettingItem
                    icon="bell"
                    title="启用提醒"
                    right={
                        <Switch
                            value={settings?.notificationsEnabled ?? false}
                            onValueChange={(value) =>
                                handleSettingToggle('notificationsEnabled', value)
                            }
                        />
                    }
                />
                <SettingItem
                    icon="clock-time-four"
                    title="提醒间隔"
                    description={`${settings?.reminderInterval ?? 240} 分钟`}
                    onPress={handleReminderSettings}
                />
                <SettingItem
                    icon="moon-waning-crescent"
                    title="夜间免打扰"
                    description="22:00 - 07:00"
                    right={
                        <Switch
                            value={settings?.nightModeEnabled ?? false}
                            onValueChange={(value) =>
                                handleSettingToggle('nightModeEnabled', value)
                            }
                        />
                    }
                />
            </SettingSection>

            {/* 隐私设置 */}
            <SettingSection title="隐私与安全">
                <SettingItem
                    icon="eye-off"
                    title="隐私模式"
                    description="隐藏敏感内容和通知"
                    right={
                        <Switch
                            value={settings?.privacyMode ?? false}
                            onValueChange={(value) =>
                                handleSettingToggle('privacyMode', value)
                            }
                        />
                    }
                />
                <SettingItem
                    icon="database"
                    title="数据管理"
                    description="导出或删除数据"
                    onPress={handleDataManagement}
                />
            </SettingSection>

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
