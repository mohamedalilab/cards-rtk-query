import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { addNewCard, deleteCard, fetchCards, updateCard } from "./cardsApi";

const cardsAdaptar = createEntityAdapter();

// Static initial data
const initialState = cardsAdaptar.getInitialState({
  error: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  editingId: null,
});

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // for get card what we need to edit
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    // to reset form and leave current card
    cancelEdit: (state) => {
      state.editingId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        cardsAdaptar.upsertMany(state, action.payload);
      })
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        cardsAdaptar.addOne(state, action.payload);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        cardsAdaptar.upsertOne(state, action.payload);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        cardsAdaptar.removeOne(state, action.payload);
      });
  },
});

export const { setEditingId, cancelEdit } = cardsSlice.actions;

export const { selectById: selectCardById, selectIds: selectCardsIds } =
  cardsAdaptar.getSelectors((state) => state.cards);
export const selectCardsStatus = (state) => state.cards.status;
export const selectCardsError = (state) => state.cards.error;

export const selectEditingId = (state) => {
  return state.cards.editingId;
};

export default cardsSlice.reducer;
