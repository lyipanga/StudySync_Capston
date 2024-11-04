import { db, storage } from "@/lib/firebaseUtils";
import { deleteFromFirebase, uploadToFirebase } from "@/lib/HelperFunction";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

// Fetch all uploaded files
export const fetchUploadedFiles = createAsyncThunk(
  "files/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "textBooks"));
      const files = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toLocaleString() || 'N/A'
      }));
      return files;
    } catch (error) {
      toast.error("Failed to fetch files");
      return rejectWithValue(error.message);
    }
  }
);

export const uploadTextBooks = createAsyncThunk(
  "upload/uploadTextBooks",
  async ({ file, path = "uploads" }, { rejectWithValue }) => {
    try {
     

      const result = await uploadToFirebase(file, path);
      console.log('result: ', result);

      const docRef = await addDoc(collection(db, "textBooks"), {
        fileName: result.fileName,
        filePath: result.downloadURL,
        createdAt: result.createdAt,
      });

      toast.success("File uploaded successfully!");
      return {
        id: docRef.id,
        fileName: result.fileName,
        filePath: result.downloadURL,
        createdAt: new Date(Date.now()).toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
      }),
      };
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload file");
      return rejectWithValue(error.message);
    }
  }
);

// Delete a file
export const deleteFile = createAsyncThunk(
  "files/delete",
  async ({ id, filePath }, { rejectWithValue }) => {
    try {

      // Delete from Storage
      const storageRef = ref(storage, filePath);
      await deleteObject(storageRef);

      // Delete from Firestore
      await deleteDoc(doc(db, "textBooks", id));

      toast.success("File deleted successfully");
      return id;
    } catch (error) {
      toast.error("Failed to delete file");
      return rejectWithValue(error.message);
    }
  }
);
