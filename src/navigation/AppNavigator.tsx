// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import CalendarScreen from '../screens/CalendarScreen';
// import StatisticsScreen from '../screens/StatisticsScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import { useTheme } from 'react-native-paper';
//
// const Tab = createBottomTabNavigator();
//
// export default function AppNavigator() {
//     const theme = useTheme();
//
//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 screenOptions={{
//                     tabBarActiveTintColor: theme.colors.primary,
//                     tabBarInactiveTintColor: theme.colors.placeholder,
//                     headerStyle: {
//                         backgroundColor: theme.colors.surface,
//                     },
//                     headerTintColor: theme.colors.primary,
//                     headerTitleStyle: {
//                         color: theme.colors.text,
//                     },
//                     tabBarStyle: {
//                         backgroundColor: theme.colors.background,
//                     },
//                 }}>
//                 <Tab.Screen
//                     name="首页"
//                     component={HomeScreen}
//                     options={{
//                         tabBarIcon: ({ color, size }) => (
//                             <Icon name="home" size={size} color={color} />
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="日历"
//                     component={CalendarScreen}
//                     options={{
//                         tabBarIcon: ({ color, size }) => (
//                             <Icon name="calendar" size={size} color={color} />
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="统计"
//                     component={StatisticsScreen}
//                     options={{
//                         tabBarIcon: ({ color, size }) => (
//                             <Icon name="chart-bar" size={size} color={color} />
//                         ),
//                     }}
//                 />
//                 <Tab.Screen
//                     name="我的"
//                     component={ProfileScreen}
//                     options={{
//                         tabBarIcon: ({ color, size }) => (
//                             <Icon name="account" size={size} color={color} />
//                         ),
//                     }}
//                 />
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// }


// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from '../hooks/useTheme';
import {
    createNavigatorStyles,
    createHeaderStyles,
    createTabBarStyles,
    createScreenStyles,
} from './styles';

// 导入屏幕
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// 定义图标映射
const TAB_ICONS = {
    Home: 'home',
    Calendar: 'calendar',
    Statistics: 'chart-bar',
    Profile: 'account',
};

export default function AppNavigator() {
    const theme = useTheme();
    const navigatorStyles = createNavigatorStyles(theme);
    const headerStyles = createHeaderStyles(theme);
    const tabBarStyles = createTabBarStyles(theme);
    const screenStyles = createScreenStyles(theme);

    // 创建标签栏图标
    const createTabBarIcon = (routeName: string) => {
        return ({ focused, color, size }: { focused: boolean; color: string; size: number }) => (
            <Icon
                name={TAB_ICONS[routeName as keyof typeof TAB_ICONS]}
                size={size}
                color={color}
                style={tabBarStyles.icon}
            />
        );
    };

    // 自定义标签栏选项
    const screenOptions = {
        // 标题栏配置
        headerStyle: headerStyles.header,
        headerTitleStyle: headerStyles.title,
        headerTitleAlign: 'center' as const,

        // 标签栏配置
        tabBarStyle: tabBarStyles.tabBar,
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: tabBarStyles.label,
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={screenOptions}
                sceneContainerStyle={screenStyles.screen}
            >
                <Tab.Screen
                    name="首页"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: createTabBarIcon('Home'),
                    }}
                />
                <Tab.Screen
                    name="日历"
                    component={CalendarScreen}
                    options={{
                        tabBarIcon: createTabBarIcon('Calendar'),
                    }}
                />
                <Tab.Screen
                    name="统计"
                    component={StatisticsScreen}
                    options={{
                        tabBarIcon: createTabBarIcon('Statistics'),
                    }}
                />
                <Tab.Screen
                    name="我的"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: createTabBarIcon('Profile'),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
