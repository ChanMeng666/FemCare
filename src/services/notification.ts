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

// Move isNightTime outside the service object
function isNightTime() {
    const hour = new Date().getHours();
    return hour >= 22 || hour < 7;
}

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

    // // 检查是否是夜间时段
    // isNightTime() {
    //     const hour = new Date().getHours();
    //     return hour >= 22 || hour < 7;
    // },

    // 调度下次提醒
    async scheduleNextReminder() {
        try {
            const settings = await storageService.getUserSettings();
            if (!settings.notificationsEnabled) return;

            // Use imported isNightTime function
            if (settings.nightModeEnabled && isNightTime()) return;

            // Rest of the implementation...
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
