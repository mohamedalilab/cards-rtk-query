import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "../features/cardsSlice";
import themeReducer from "../features/themeSlice";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    theme: themeReducer
  },
});
