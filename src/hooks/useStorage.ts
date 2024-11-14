import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storage';
import type { UsageRecord, CycleRecord, UserSettings } from '../types';

export function useUsageRecords() {
    const [records, setRecords] = useState<UsageRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const loadRecords = useCallback(async () => {
        setLoading(true);
        const data = await storageService.getUsageRecords();
        setRecords(data);
        setLoading(false);
    }, []);

    const addRecord = useCallback(async (record: Omit<UsageRecord, 'id'>) => {
        const success = await storageService.addUsageRecord(record);
        if (success) {
            loadRecords();
        }
        return success;
    }, [loadRecords]);

    useEffect(() => {
        loadRecords();
    }, [loadRecords]);

    return { records, loading, addRecord, reload: loadRecords };
}

export function useSettings() {
    const [settings, setSettings] = useState<UserSettings | null>(null);
    const [loading, setLoading] = useState(true);

    const loadSettings = useCallback(async () => {
        setLoading(true);
        const data = await storageService.getUserSettings();
        setSettings(data);
        setLoading(false);
    }, []);

    const updateSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
        const success = await storageService.updateUserSettings(newSettings);
        if (success) {
            loadSettings();
        }
        return success;
    }, [loadSettings]);

    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    return { settings, loading, updateSettings };
}
