import { createSlice } from "@reduxjs/toolkit";
import {
  deleteFile,
  fetchUploadedFiles,
  uploadTextBooks,
} from "./uploadTextBookThunk";

const initialState = {
  loading: false,
  fetchloading: false,
  deleteloading: false,
  uploadedFile: null,
  error: null,
  files: [],
  error: null,
};

const uploadTextBooksSlice = createSlice({
  name: "uploadTextBooks",
  initialState,
  reducers: {
    clearUpload: (state) => {
      state.uploadedFile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadTextBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadTextBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.files = [...state.files,action.payload];
        state.error = null;
      })
      .addCase(uploadTextBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch files
      .addCase(fetchUploadedFiles.pending, (state) => {
        state.fetchloading = true;
        state.error = null;
      })
      .addCase(fetchUploadedFiles.fulfilled, (state, action) => {
        state.fetchloading = false;
        state.files = action.payload;
      })
      .addCase(fetchUploadedFiles.rejected, (state, action) => {
        state.fetchloading = false;
        state.error = action.payload;
      })
      // Delete file
      .addCase(deleteFile.pending, (state) => {
        state.deleteloading = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.deleteloading = false;
        state.files = state.files.filter((file) => file.id !== action.payload);
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.deleteloading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUpload } = uploadTextBooksSlice.actions;
export default uploadTextBooksSlice.reducer;
