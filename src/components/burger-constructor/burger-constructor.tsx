import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

import {
  fetchCreateOrder,
  getOrderData,
  getOrderRequest,
  clearOrderData
} from '../../redux/slices/orderSlice';

import {
  clear,
  getBun,
  getIngredients
} from '../../redux/slices/constructorItemSlice';
import { getIsAuth, getUser } from '../../redux/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAutch = useSelector(getIsAuth);
  const user = useSelector(getUser);
  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);

  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
    if (!isAutch) navigate('/login');
    if (!bun || orderRequest) return;
    if (user && isAutch) {
      dispatch(
        fetchCreateOrder([
          bun._id,
          bun._id,
          ...ingredients.map((ingredient: TIngredient) => ingredient._id)
        ])
      )
        .unwrap()
        .then(() => {
          dispatch(clear());
        });
    }
  };

  const closeOrderModal = () => dispatch(clearOrderData());

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((s: number, v: TIngredient) => s + v.price, 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
