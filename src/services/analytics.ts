import { CycleRecord, CycleStatistics, SymptomType, ProductType } from '../types';
import { differenceInDays } from 'date-fns';

export const analyticsService = {
    calculateCycleStatistics(cycles: CycleRecord[], usageRecords: any[]): CycleStatistics {
        if (cycles.length === 0) {
            return {
                averageCycleLength: 0,
                averagePeriodLength: 0,
                longestCycle: 0,
                shortestCycle: 0,
                commonSymptoms: {},
                productUsage: {},
            };
        }

        // 计算周期长度
        const cycleLengths = cycles.slice(0, -1).map((cycle, index) => {
            const nextCycle = cycles[index + 1];
            return differenceInDays(
                new Date(nextCycle.startDate),
                new Date(cycle.startDate)
            );
        });

        // 计算经期长度
        const periodLengths = cycles
            .filter(cycle => cycle.endDate)
            .map(cycle =>
                differenceInDays(
                    new Date(cycle.endDate!),
                    new Date(cycle.startDate)
                ) + 1
            );

        // 统计症状
        const symptoms: { [key in SymptomType]?: number } = {};
        cycles.forEach(cycle => {
            cycle.diaryEntries.forEach(entry => {
                entry.symptoms.forEach(symptom => {
                    symptoms[symptom] = (symptoms[symptom] || 0) + 1;
                });
            });
        });

        // 统计用品使用情况
        const productUsage: { [key in ProductType]?: number } = {};
        usageRecords.forEach(record => {
            productUsage[record.productType] = (productUsage[record.productType] || 0) + 1;
        });

        return {
            averageCycleLength: cycleLengths.length > 0
                ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
                : 0,
            averagePeriodLength: periodLengths.length > 0
                ? Math.round(periodLengths.reduce((a, b) => a + b, 0) / periodLengths.length)
                : 0,
            longestCycle: Math.max(...cycleLengths, 0),
            shortestCycle: Math.min(...cycleLengths, 0),
            commonSymptoms: symptoms,
            productUsage,
        };
    },

    predictNextPeriod(cycles: CycleRecord[]): Date | null {
        if (cycles.length < 2) {
            return null;
        }

        const lastCycle = cycles[cycles.length - 1];
        const averageCycleLength = this.calculateCycleStatistics(cycles, []).averageCycleLength;

        if (averageCycleLength === 0) {
            return null;
        }

        return new Date(lastCycle.startDate + averageCycleLength * 24 * 60 * 60 * 1000);
    }
};
