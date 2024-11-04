import { db } from '@/lib/firebaseUtils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';
import toast from 'react-hot-toast';

// Add Flashcard Thunk
export const addFlashcard = createAsyncThunk(
  'flashcards/add',
  async ({ question, answer }, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'flashcards'), {
        question,
        answer,
        createdAt: serverTimestamp(),
      });

      toast.success('Flashcard added successfully!');
      
      return {
        id: docRef.id,
        question,
        answer,
        createdAt: new Date().toLocaleString()
      };
    } catch (error) {
      console.error('Error adding flashcard:', error);
      toast.error(error.message || 'Failed to add flashcard');
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Flashcards Thunk
export const fetchFlashcards = createAsyncThunk(
  'flashcards/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const flashcardsRef = collection(db, 'flashcards');
      const q = query(flashcardsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const flashcards = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toLocaleString() || new Date().toLocaleString()
      }));

      return flashcards;
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      toast.error('Failed to fetch flashcards');
      return rejectWithValue(error.message);
    }
  }
);

// Delete Flashcard Thunk
export const deleteFlashcard = createAsyncThunk(
  'flashcards/delete',
  async (cardId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'flashcards', cardId));
      toast.success('Flashcard deleted successfully!');
      return cardId;
    } catch (error) {
      console.error('Error deleting flashcard:', error);
      toast.error('Failed to delete flashcard');
      return rejectWithValue(error.message);
    }
  }
);
