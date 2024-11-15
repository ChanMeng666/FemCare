import { StyleSheet } from 'react-native';
import { Theme } from '../../../styles/theme';
import { flexMixins, spacingMixins } from '../../../styles/mixins';

export const createListStyles = (theme: Theme) => StyleSheet.create({
    // 列表容器
    list: {
        flex: 1,
    },

    // 列表项
    listItem: {
        ...flexMixins.flexRow,
        ...flexMixins.flexBetween,
        ...spacingMixins.paddingY('sm'),
        ...spacingMixins.paddingX('md'),
        minHeight: 48,
    },

    // 带分割线的列表项
    listItemDivided: {
        ...flexMixins.flexRow,
        ...flexMixins.flexBetween,
        ...spacingMixins.paddingY('sm'),
        ...spacingMixins.paddingX('md'),
        minHeight: 48,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
    },

    // 列表项图标
    listItemIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        ...flexMixins.flexCenter,
        backgroundColor: `${theme.colors.primary.main}10`,
        marginRight: theme.spacing.md,
    },

    // 列表项内容
    listItemContent: {
        flex: 1,
    },
});
