export const createCardStyles = (theme: Theme) => StyleSheet.create({
    // 基础卡片
    card: {
        backgroundColor: theme.colors.background.paper,
        borderRadius: theme.borders.radius.lg,
        ...spacingMixins.margin('md'),
        ...spacingMixins.padding('md'),
    },

    // 卡片标题区
    cardHeader: {
        ...flexMixins.flexRow,
        ...flexMixins.flexBetween,
        ...spacingMixins.marginBottom('md'),
    },

    // 卡片内容区
    cardContent: {
        flex: 1,
    },

    // 卡片操作区
    cardActions: {
        ...flexMixins.flexRow,
        ...flexMixins.flexBetween,
        ...spacingMixins.marginTop('md'),
        borderTopWidth: 1,
        borderTopColor: theme.colors.divider,
        ...spacingMixins.paddingTop('md'),
    },
});
