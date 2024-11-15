// 导出公共样式
import {Theme} from "../../styles/theme";

export * from './common';

// 导出屏幕特定样式
export * from './HomeScreen';
export * from './CalendarScreen';
export * from './StatisticsScreen';
export * from './ProfileScreen';

// 添加类型导出
export interface StylesProps {
    theme: Theme;
}
