import { test } from '@jest/globals';
import slice, { initialState } from '../../constructorItemSlice';
import { clear } from '../../constructorItemSlice';
import data from '../ingridients.json';

const initial = structuredClone(initialState);
initial.ingredients = data;

test('[clear] - Проверка редюссера: очистка ингредиентов', () => {
  const newState = slice(initial, clear());
  expect(newState.ingredients).toEqual([]);
});
