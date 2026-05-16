import type { Item } from '@/types/game';

export const initialItems: Item[] = [
  { id: 'onigiri-salmon', name: '鮭おにぎり', barcode: '490100100101', price: 148, stock: 7, maxStock: 12 },
  { id: 'bento-night', name: '深夜弁当', barcode: '490100100202', price: 498, stock: 4, maxStock: 8 },
  { id: 'green-tea', name: '緑茶 500ml', barcode: '490100100303', price: 129, stock: 9, maxStock: 16 },
  { id: 'black-coffee', name: 'ブラック缶コーヒー', barcode: '490100100404', price: 120, stock: 11, maxStock: 16 },
  { id: 'umbrella-clear', name: '透明ビニール傘', barcode: '490100100505', price: 660, stock: 3, maxStock: 6 },
  { id: 'red-candy', name: '赤い飴', barcode: '000000000002', price: 20, stock: 1, maxStock: 1, haunted: true },
];
