import { rootReducer } from '../store';
import { initialState as ingredientsInitialState } from '../slices/ingredients/ingredientsSlice';
import { initialState as constructorInitialState } from '../slices/constructors/constructorItemSlice';
import { initialState as orderInitialState } from '../slices/orders/orderSlice';
import { initialState as historyInitialState } from '../slices/history/historySlice';
import { initialState as userInitialState } from '../slices/users/userSlice';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при undefined state и UNKNOWN_ACTION', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = rootReducer(undefined, action);

    expect(nextState).toEqual({
      user: userInitialState,
      item: constructorInitialState,
      order: orderInitialState,
      history: historyInitialState,
      ingredients: ingredientsInitialState
    });
  });

  it('не должен мутировать состояние при UNKNOWN_ACTION', () => {
    const currentState = {
      user: { ...userInitialState, name: 'Test User' },
      item: { ...constructorInitialState, bun: { id: 'bun-123' } },
      order: orderInitialState,
      history: historyInitialState,
      ingredients: ingredientsInitialState
    };

    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = rootReducer(currentState, action);

    expect(nextState).toBe(currentState);
  });
});