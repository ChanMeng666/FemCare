import { ProductType } from '../types';

export const ProductIcons = {
    [ProductType.PAD]: 'shield-outline',
    [ProductType.TAMPON]: 'bandage',
    [ProductType.CUP]: 'cup',
    [ProductType.DISC]: 'disc'
};

export const ProductNames = {
    [ProductType.PAD]: '卫生巾',
    [ProductType.TAMPON]: '卫生棉条',
    [ProductType.CUP]: '月经杯',
    [ProductType.DISC]: '月经盘'
};

export const getProductIcon = (type: ProductType): string => {
    return ProductIcons[type];
};

export const getProductName = (type: ProductType): string => {
    return ProductNames[type];
};
