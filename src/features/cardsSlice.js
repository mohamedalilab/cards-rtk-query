import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

// Static initial data
const initialState = {
  items: [],
  error: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  editingId: null,
};

//
const CARDS_URL = "/api/cards";

// create crud operation with cards:
// 1. fetch all cards data
export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await axios.get(CARDS_URL);
  return response.data;
});
// 2. add new card
export const addNewCard = createAsyncThunk(
  "cards/addNewCard",
  async (newCard) => {
    const response = await axios.post(CARDS_URL, newCard);
    return response.data;
  }
);
// 3. delete card
export const deleteCard = createAsyncThunk("cards/deleteCard", async (id) => {
  await axios.delete(`${CARDS_URL}/${id}`);
  return id;
});
// 4. update card
export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (updatedCard) => {
    const response = await axios.put(
      `${CARDS_URL}/${updatedCard.id}`,
      updatedCard
    );
    return response.data;
  }
);

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
        state.items = state.items.concat(action.payload);
      })
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        let targetIndex = state.items.findIndex(
          (card) => card.id === action.payload.id
        );
        if (targetIndex !== -1) {
          state.items[targetIndex] = action.payload;
        }
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.items = state.items.filter((card) => card.id !== action.payload);
      });
  },
});

export const { setEditingId, cancelEdit } = cardsSlice.actions;

export const selectCardsStatus = (state) => state.cards.status;
export const selectCardsError = (state) => state.cards.error;

export const selectAllCards = (state) => state.cards.items;
// memoize compution of display cards by colors
export const selectCardsByColor = createSelector(
  [selectAllCards, (_, colorCode) => colorCode],
  (items, colorCode) =>
    colorCode ? items.filter((card) => card.color === colorCode) : items
);

export const selectEditingId = (state) => {
  return state.cards.editingId;
};
// memoize select card by id
export const selectCardById = createSelector(
  [selectAllCards, (_, cardId) => cardId],
  (cards, cardId) => {
    return cards.find((card) => card.id === cardId);
  }
);

export default cardsSlice.reducer;
