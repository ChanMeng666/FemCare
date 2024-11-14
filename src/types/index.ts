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

// 症状类型
export enum SymptomType {
    CRAMPS = 'cramps',
    HEADACHE = 'headache',
    FATIGUE = 'fatigue',
    BLOATING = 'bloating',
    MOOD_SWINGS = 'mood_swings',
    BREAST_TENDERNESS = 'breast_tenderness',
    ACNE = 'acne',
    BACKACHE = 'backache',
}

// 心情类型
export enum MoodType {
    HAPPY = 'happy',
    NORMAL = 'normal',
    SAD = 'sad',
    ANGRY = 'angry',
    ANXIOUS = 'anxious',
    TIRED = 'tired',
}

// 日记记录
export interface DiaryEntry {
    id: string;
    date: number;
    symptoms: SymptomType[];
    mood: MoodType;
    flow: 'light' | 'medium' | 'heavy';
    notes?: string;
}

// 扩展周期记录
export interface CycleRecord {
    id: string;
    startDate: number;
    endDate?: number;
    diaryEntries: DiaryEntry[];
    predictedNextDate?: number;
}

// 统计数据
export interface CycleStatistics {
    averageCycleLength: number;
    averagePeriodLength: number;
    longestCycle: number;
    shortestCycle: number;
    commonSymptoms: { [key in SymptomType]?: number };
    productUsage: { [key in ProductType]?: number };
}
