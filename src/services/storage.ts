import AsyncStorage from '@react-native-async-storage/async-storage';
import { UsageRecord, CycleRecord, UserSettings } from '../types';

const STORAGE_KEYS = {
    USAGE_RECORDS: 'usage_records',
    CYCLE_RECORDS: 'cycle_records',
    USER_SETTINGS: 'user_settings',
};

// 默认设置
const DEFAULT_SETTINGS: UserSettings = {
    defaultProductType: 'pad',
    reminderInterval: 240, // 4小时
    nightModeEnabled: false,
    notificationsEnabled: true,
};

export const storageService = {
    // 使用记录相关方法
    async getUsageRecords(): Promise<UsageRecord[]> {
        try {
            const records = await AsyncStorage.getItem(STORAGE_KEYS.USAGE_RECORDS);
            return records ? JSON.parse(records) : [];
        } catch (error) {
            console.error('Failed to get usage records:', error);
            return [];
        }
    },

    async addUsageRecord(record: Omit<UsageRecord, 'id'>): Promise<boolean> {
        try {
            const records = await this.getUsageRecords();
            const newRecord = {
                ...record,
                id: Date.now().toString(),
            };
            await AsyncStorage.setItem(
                STORAGE_KEYS.USAGE_RECORDS,
                JSON.stringify([...records, newRecord])
            );
            return true;
        } catch (error) {
            console.error('Failed to add usage record:', error);
            return false;
        }
    },

    // 月经周期相关方法
    async getCycleRecords(): Promise<CycleRecord[]> {
        try {
            const records = await AsyncStorage.getItem(STORAGE_KEYS.CYCLE_RECORDS);
            return records ? JSON.parse(records) : [];
        } catch (error) {
            console.error('Failed to get cycle records:', error);
            return [];
        }
    },

    async addCycleRecord(record: Omit<CycleRecord, 'id'>): Promise<boolean> {
        try {
            const records = await this.getCycleRecords();
            const newRecord = {
                ...record,
                id: Date.now().toString(),
            };
            await AsyncStorage.setItem(
                STORAGE_KEYS.CYCLE_RECORDS,
                JSON.stringify([...records, newRecord])
            );
            return true;
        } catch (error) {
            console.error('Failed to add cycle record:', error);
            return false;
        }
    },

    // 设置相关方法
    async getUserSettings(): Promise<UserSettings> {
        try {
            const settings = await AsyncStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
            return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
        } catch (error) {
            console.error('Failed to get user settings:', error);
            return DEFAULT_SETTINGS;
        }
    },

    async updateUserSettings(settings: Partial<UserSettings>): Promise<boolean> {
        try {
            const currentSettings = await this.getUserSettings();
            const newSettings = { ...currentSettings, ...settings };
            await AsyncStorage.setItem(
                STORAGE_KEYS.USER_SETTINGS,
                JSON.stringify(newSettings)
            );
            return true;
        } catch (error) {
            console.error('Failed to update user settings:', error);
            return false;
        }
    },
};
