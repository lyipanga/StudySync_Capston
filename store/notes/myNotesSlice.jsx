import { createSlice } from "@reduxjs/toolkit";
import { addNotes, deleteNoteFromDb, fetchNotes } from "./myNotesThunk";

const initialState = {
  notes: [],
  loading: false,
  fehLoading: false,
  delloading: false,
  error: null,
};

const myNotesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearNotes: (state) => {
      state.notes = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add note cases
      .addCase(addNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
        state.error = null;
      })
      .addCase(addNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       // Fetch notes cases
       .addCase(fetchNotes.pending, (state) => {
        state.fehLoading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.fehLoading = false;
        state.notes = action.payload;
        state.error = null;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.fehLoading = false;
        state.error = action.payload;
      })
       // Delete note cases
       .addCase(deleteNoteFromDb.pending, (state) => {
        state.delloading = true;
        state.error = null;
      })
      .addCase(deleteNoteFromDb.fulfilled, (state, action) => {
        state.delloading = false;
        state.notes = state.notes.filter(note => note.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteNoteFromDb.rejected, (state, action) => {
        state.delloading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNotes } = myNotesSlice.actions;
export default myNotesSlice.reducer;