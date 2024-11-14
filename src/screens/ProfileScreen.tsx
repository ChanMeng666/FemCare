import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Divider, Text } from 'react-native-paper';
import { useSettings } from '../hooks/useStorage';

export default function ProfileScreen() {
    const { settings, updateSettings } = useSettings();

    if (!settings) {
        return (
            <View style={styles.container}>
                <Text>加载中...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
