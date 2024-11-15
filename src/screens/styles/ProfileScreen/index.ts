import { StyleSheet } from 'react-native';
import type { Theme } from '../../../styles/theme';
import type { StylesProps } from '../';
import { flexMixins, spacingMixins } from '../../../styles/mixins';

export const createProfileStyles = (theme: Theme) => StyleSheet.create({
    // 设置分组
    settingSection: {
        ...spacingMixins.marginBottom('lg'),
    },

    sectionTitle: {
        ...spacingMixins.paddingX('md'),
        ...spacingMixins.marginBottom('sm'),
        color: theme.colors.text.secondary,
    },

    // 设置项
    settingItem: {
        ...flexMixins.flexRow,
        alignItems: 'center',
        ...spacingMixins.padding('md'),
    },

    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        ...flexMixins.flexCenter,
        backgroundColor: `${theme.colors.primary.main}10`,
        marginRight: theme.spacing.md,
    },

    settingContent: {
        flex: 1,
    },

    settingDescription: {
        ...spacingMixins.marginTop('xs'),
        color: theme.colors.text.secondary,
    },

    // 页脚
    footer: {
        ...spacingMixins.padding('lg'),
        alignItems: 'center',
    },

    deleteButton: {
        ...spacingMixins.marginBottom('md'),
    },
});
