import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CARDS_URL = "/api/cards";

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