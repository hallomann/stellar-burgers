import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import { v4 as uuidv4 } from 'uuid';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const enrichedOrders = orders.map((order) => ({
    ...order,
    uniqueId: order.uniqueId || uuidv4()
  }));

  const orderByDate = [...enrichedOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return <OrdersListUI orderByDate={orderByDate} />;
});
