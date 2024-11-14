import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { storageService } from './storage';

// 配置通知行为
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export const notificationService = {
    // 请求通知权限
    async requestPermissions() {
        if (!Device.isDevice) {
            return false;
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.HIGH,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF385C',
            });
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        return finalStatus === 'granted';
    },

    // 检查是否是夜间时段
    isNightTime() {
        const hour = new Date().getHours();
        return hour >= 22 || hour < 7;
    },

    // 调度下次提醒
    async scheduleNextReminder() {
        try {
            // 获取用户设置
            const settings = await storageService.getUserSettings();

            // 如果通知被禁用，直接返回
            if (!settings.notificationsEnabled) {
                return;
            }

            // 如果是夜间模式且当前是夜间时段，跳过提醒
            if (settings.nightModeEnabled && this.isNightTime()) {
                return;
            }

            // 取消现有的提醒
            await Notifications.cancelAllScheduledNotificationsAsync();

            // 计算下次提醒时间
            const trigger = {
                seconds: settings.reminderInterval * 60, // 转换分钟为秒
            };

            // 调度新的提醒
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '更换提醒',
                    body: '该更换卫生用品了',
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    data: { type: 'change_reminder' },
                },
                trigger,
            });

            return true;
        } catch (error) {
            console.error('Failed to schedule reminder:', error);
            return false;
        }
    },

    // 取消所有提醒
    async cancelAllReminders() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    },
};
