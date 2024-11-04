import { db } from "@/lib/firebaseUtils";
import { uploadToFirebase } from "@/lib/HelperFunction";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import toast from "react-hot-toast";

export const addNotes = createAsyncThunk(
  "notes/add",
  async ({ notes, files }, { rejectWithValue }) => {
    try {
      let uploadedFiles = [];
      
      // If files exist, upload them one by one
      if (files?.length > 0) {
        for (const file of files) {
          const result = await uploadToFirebase(file, "notes");
          uploadedFiles.push({
            downloadURL: result.downloadURL,
            fileName: result.fileName,
            createdAt: new Date().toISOString()
          });
        }
      }

      // Create the document in Firestore
      const docRef = await addDoc(collection(db, "myNotes"), {
        notes,
        files: uploadedFiles,
        createdAt: serverTimestamp(),
      });

      toast.success("Note added successfully!");
      
      return {
        id: docRef.id,
        notes,
        files: uploadedFiles,
        createdAt: new Date().toLocaleString()
      };
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error(error.message || "Failed to add note");
      return rejectWithValue(error.message);
    }
  }
);


// Add new fetchNotes thunk
export const fetchNotes = createAsyncThunk(
  "notes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const notesRef = collection(db, "myNotes");
      const q = query(notesRef, orderBy("createdAt", "desc")); // Sort by latest first
      const querySnapshot = await getDocs(q);
      
      const notes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toLocaleString() || new Date().toLocaleString()
      }));

      return notes;
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to fetch notes");
      return rejectWithValue(error.message);
    }
  }
);


// New deleteNote thunk
export const deleteNoteFromDb = createAsyncThunk(
  "notes/delete",
  async (noteId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "myNotes", noteId));
      toast.success("Note deleted successfully!");
      return noteId;
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
      return rejectWithValue(error.message);
    }
  }
);