// 卫生用品类型
export enum ProductType {
    PAD = 'pad',
    TAMPON = 'tampon',
    CUP = 'cup',
    DISC = 'disc',
}

// 使用记录
export interface UsageRecord {
    id: string;
    timestamp: number;
    productType: ProductType;
    note?: string;
}

// 月经周期记录
export interface CycleRecord {
    id: string;
    startDate: number;
    endDate?: number;
    symptoms?: string[];
    notes?: string;
}

// 用户设置
export interface UserSettings {
    defaultProductType: ProductType;
    reminderInterval: number; // 分钟
    nightModeEnabled: boolean;
    notificationsEnabled: boolean;
}
