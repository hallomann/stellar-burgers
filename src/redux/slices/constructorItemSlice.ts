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
    addIngredient(state, action: PayloadAction<{ ingredient: TIngredient }>) {
      const newIngredient = {
        ...action.payload.ingredient,
        key: uuidv4()
      };
      if (newIngredient.type === 'bun') {
        state.bun = newIngredient;
      } else {
        state.ingredients.push(newIngredient);
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
    },
    setIngredient(state, action) {
      state.ingredients = [...state.ingredients, action.payload];
    }
  },
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients
  }
});

export const { clear, setBun, setIngredients, setIngredient } = slice.actions;
export const { getBun, getIngredients } = slice.selectors;
export default slice.reducer;
