import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import uploadTextBooksSlice from "./upload/uploadTextBookSlice"
import myNotesSlice from "./notes/myNotesSlice"
import flashcardSlice from "./flashcard/flashcardSlice"



const reducers = combineReducers({
  textBooks:uploadTextBooksSlice,
  notes: myNotesSlice,
  flashcards:flashcardSlice
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
