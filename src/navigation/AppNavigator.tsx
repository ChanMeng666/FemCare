import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const theme = useTheme();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.placeholder,
                    headerStyle: {
                        backgroundColor: theme.colors.surface,
                    },
                    headerTintColor: theme.colors.primary,
                    headerTitleStyle: {
                        color: theme.colors.text,
                    },
                    tabBarStyle: {
                        backgroundColor: theme.colors.background,
                    },
                }}>
                <Tab.Screen
                    name="首页"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="日历"
                    component={CalendarScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="calendar" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="统计"
                    component={StatisticsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="chart-bar" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="我的"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="account" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
