import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../redux/store';
import {
  fetchOrderId,
  getOrderData,
  setOrderData
} from '../../redux/slices/orderSlice';
import { getIngredients } from '../../redux/slices/ingredientsSlice';
import { v4 as uuidv4 } from 'uuid';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const orderData = useSelector(getOrderData);
  useEffect(() => {
    if (number)
      dispatch(fetchOrderId(number))
        .unwrap()
        .then((item) => {
          dispatch(setOrderData(item.orders[0]));
        });
  }, []);

  const ingredients: TIngredient[] = useSelector(getIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number; uniqueId: string };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1,
              uniqueId: uuidv4()
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }
  return <OrderInfoUI orderInfo={orderInfo} />;
};
