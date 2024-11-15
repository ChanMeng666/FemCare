import { colors, spacing, typography, borders, shadows } from './tokens';

// 将 theme 重命名为 lightTheme
export const lightTheme = {
    colors,
    spacing,
    typography,
    borders,
    shadows,

    // 组件特定样式
    components: {
        Button: {
            // 基础样式
            base: {
                borderRadius: borders.radius.md,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            // 尺寸变体
            sizes: {
                small: {
                    paddingHorizontal: spacing.sm,
                    paddingVertical: spacing.xs,
                    ...typography.variants.button,
                    fontSize: typography.sizes.sm
                },
                medium: {
                    paddingHorizontal: spacing.md,
                    paddingVertical: spacing.sm,
                    ...typography.variants.button
                },
                large: {
                    paddingHorizontal: spacing.lg,
                    paddingVertical: spacing.md,
                    ...typography.variants.button,
                    fontSize: typography.sizes.lg
                }
            },
            // 类型变体
            variants: {
                contained: {
                    backgroundColor: colors.primary.main,
                    color: colors.primary.contrast
                },
                outlined: {
                    backgroundColor: 'transparent',
                    borderWidth: borders.width.thin,
                    borderColor: colors.primary.main,
                    color: colors.primary.main
                },
                text: {
                    backgroundColor: 'transparent',
                    color: colors.primary.main
                }
            }
        },

        Card: {
            base: {
                backgroundColor: colors.background.paper,
                borderRadius: borders.radius.lg,
                padding: spacing.md,
                margin: spacing.sm,
                ...shadows.sm
            },
            variants: {
                elevated: {
                    ...shadows.md
                },
                outlined: {
                    borderWidth: borders.width.thin,
                    borderColor: colors.divider,
                    ...shadows.none
                }
            }
        },

        Input: {
            base: {
                backgroundColor: colors.background.paper,
                borderWidth: borders.width.thin,
                borderColor: colors.grey[300],
                borderRadius: borders.radius.md,
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,
                ...typography.variants.body1
            },
            states: {
                focused: {
                    borderColor: colors.primary.main
                },
                error: {
                    borderColor: colors.error.main
                },
                disabled: {
                    backgroundColor: colors.grey[100],
                    borderColor: colors.grey[300]
                }
            }
        },
    }
} as const;  // 添加 as const 以获得更精确的类型推断

// 导出主题类型
export type Theme = typeof lightTheme;
