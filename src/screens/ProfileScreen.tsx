import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Divider, Text, Portal, Dialog, TouchableRipple, useTheme } from 'react-native-paper';
import { useSettings } from '../hooks/useStorage';
import { useThemeContext } from '../contexts/ThemeContext';
import { themeNames } from '../themes';
import type { ThemeType } from '../types/theme';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function ProfileScreen() {
    const { settings, updateSettings } = useSettings();
    const { theme: currentTheme, setTheme } = useThemeContext();
    const [themeDialogVisible, setThemeDialogVisible] = useState(false);
    const theme = useTheme();

    if (!settings) {
        return (
            <View style={styles.container}>
                <Text>加载中...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <List.Section>
                <List.Subheader
                    style={{ color: theme.colors.text }}
                >
                    主题设置
                </List.Subheader>
                <List.Item
                    title="颜色主题"
                    titleStyle={{ color: theme.colors.text }}
                    description={themeNames[currentTheme]}
                    descriptionStyle={{ color: theme.colors.text }}
                    onPress={() => setThemeDialogVisible(true)}
                    right={props => <List.Icon {...props} icon="chevron-right" color={theme.colors.text} />}
                />
                <Divider />
            </List.Section>

            <List.Section>
                <List.Subheader>提醒设置</List.Subheader>
                <List.Item
                    title="启用提醒"
                    right={() => (
                        <Switch
                            value={settings.notificationsEnabled}
                            onValueChange={value =>
                                updateSettings({ notificationsEnabled: value })
                            }
                        />
                    )}
                />
                <Divider />
                <List.Item
                    title="夜间免打扰"
                    description="22:00 - 07:00 期间不发送提醒"
                    right={() => (
                        <Switch
                            value={settings.nightModeEnabled}
                            onValueChange={value =>
                                updateSettings({ nightModeEnabled: value })
                            }
                        />
                    )}
                />
                <Divider />
                <List.Item
                    title="提醒间隔"
                    description={`${settings.reminderInterval} 分钟`}
                    onPress={() => {
                        // TODO: 添加修改间隔的对话框
                    }}
                />
            </List.Section>

            <Portal>
                <Dialog
                    visible={themeDialogVisible}
                    onDismiss={() => setThemeDialogVisible(false)}
                    style={[
                        styles.dialog,
                        {
                            backgroundColor: theme.colors.surface,
                            borderRadius: 28,
                        }
                    ]}
                >
                    <Dialog.Title
                        style={{
                            color: theme.colors.text,
                            textAlign: 'center',
                        }}
                    >
                        选择主题
                    </Dialog.Title>
                    <Dialog.Content>
                        {Object.entries(themeNames).map(([value, label]) => (
                            <TouchableRipple
                                key={value}
                                onPress={() => {
                                    setTheme(value as ThemeType);
                                    setThemeDialogVisible(false);
                                }}
                                style={styles.themeOption}
                            >
                                {/*<List.Item*/}
                                {/*    title={label}*/}
                                {/*    right={props =>*/}
                                {/*        theme === value ? (*/}
                                {/*            <List.Icon {...props} icon="check" />*/}
                                {/*        ) : null*/}
                                {/*    }*/}
                                {/*/>*/}
                                <View style={styles.themeOptionContent}>
                                    <Text style={{ color: theme.colors.text }}>
                                        {label}
                                    </Text>
                                    {currentTheme === value && (
                                        <Icon
                                            name="check"
                                            size={24}
                                            color={theme.colors.primary}
                                        />
                                    )}
                                </View>
                            </TouchableRipple>
                        ))}
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dialog: {
        marginHorizontal: 24,
    },
    themeOption: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    themeOptionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
