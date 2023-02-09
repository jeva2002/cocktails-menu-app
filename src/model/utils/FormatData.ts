import { Order } from '../../controller/slices/orders';

export const capitalize = (text: string) => {
  const firstLetter = text[0].toUpperCase();
  const rest = text.slice(1).toLowerCase();
  return firstLetter + rest;
};

export const formatOrder = (order: Order) => {
  const orderArray = Object.entries(order.order);
  return {
    table: order.table,
    order: orderArray.filter((e) => e[1] !== undefined),
  };
};
