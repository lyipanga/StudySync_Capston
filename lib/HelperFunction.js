import { storage } from "@/lib/firebaseUtils";
import { serverTimestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

// Core Firebase delete function
export const deleteFromFirebase = async (filePath, fileId) => {
  const storageRef = ref(storage, filePath);
  await deleteObject(storageRef);
};

export const uploadToFirebase = async (file, path) => {
  const fileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `${path}/${fileName}`);

  const uploadResult = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadResult.ref);

  return {
    downloadURL,
    fileName,
    uploadResult,
    createdAt: serverTimestamp(),
  };
};
