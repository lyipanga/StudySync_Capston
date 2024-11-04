import { createSlice } from "@reduxjs/toolkit";
import { addFlashcard, deleteFlashcard, fetchFlashcards } from "./flashCardThunk";



const flashcardSlice = createSlice({
  name: 'flashcards',
  initialState: {
    cards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Flashcard
      .addCase(addFlashcard.pending, (state) => {
        state.loading = true;
      })
      .addCase(addFlashcard.fulfilled, (state, action) => {
        state.cards.unshift(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addFlashcard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Flashcards
      .addCase(fetchFlashcards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlashcards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFlashcards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Flashcard
      .addCase(deleteFlashcard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFlashcard.fulfilled, (state, action) => {
        state.cards = state.cards.filter(card => card.id !== action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteFlashcard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flashcardSlice.reducer;