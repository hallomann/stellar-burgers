import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorItemState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

const initialState: TConstructorItemState = {
  bun: null,
  ingredients: []
};

const slice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addIngredient: {
      reducer(
        state,
        action: PayloadAction<TIngredient & { uniqueId: string }>
      ) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        return {
          payload: {
            ...ingredient,
            uniqueId: uuidv4()
          }
        };
      }
    },
    setBun(state, action) {
      state.bun = action.payload;
    },
    clear(state) {
      state.bun = null;
      state.ingredients = [];
    },
    setIngredients(state, action) {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients
  }
});

export const { clear, setBun, setIngredients, addIngredient } = slice.actions;
export const { getBun, getIngredients } = slice.selectors;
export default slice.reducer;
