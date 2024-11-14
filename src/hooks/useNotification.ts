import { useEffect, useRef, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { notificationService } from '../services/notification';

export function useNotifications() {
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    // 处理收到通知
    const handleNotification = useCallback((notification: Notifications.Notification) => {
        // 可以根据notification.request.content.data.type处理不同类型的通知
        console.log('收到通知:', notification);
    }, []);

    // 处理点击通知
    const handleNotificationResponse = useCallback((response: Notifications.NotificationResponse) => {
        const data = response.notification.request.content.data;
        console.log('响应通知:', data);
    }, []);

    useEffect(() => {
        // 请求权限
        notificationService.requestPermissions();

        // 设置通知监听器
        notificationListener.current = Notifications.addNotificationReceivedListener(handleNotification);
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            handleNotificationResponse
        );

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, [handleNotification, handleNotificationResponse]);

    return {
        scheduleReminder: notificationService.scheduleNextReminder,
        cancelReminders: notificationService.cancelAllReminders,
    };
}
