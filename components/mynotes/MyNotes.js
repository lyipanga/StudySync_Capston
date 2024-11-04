"use client";
import React, { useState, useEffect, useRef } from "react";
import { Plus, File, X, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotes,
  deleteNoteFromDb,
  fetchNotes,
} from "@/store/notes/myNotesThunk";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import DisplayNotes from "./DisplayNotes";
import ViewPDF from "./ViewPDF";

const MyNotes = () => {
  const dispatch = useDispatch();
  const {
    notes: savedNotes,
    loading,
    fehLoading,
  } = useSelector((state) => state.notes);
  const [notes, setNotes] = useState([]);
  const [files, setFiles] = useState([]);
  const [noteInput, setNoteInput] = useState({
    title: "",
    content: "",
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);

  const handleAddNote = () => {
    if (noteInput.title.trim() && noteInput.content.trim()) {
      setNotes([...notes, { ...noteInput }]);
      setNoteInput({ title: "", content: "" });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (file) => file.type === "application/pdf"
      );
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      e.target.value = "";
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const deleteFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await dispatch(
        addNotes({
          notes,
          files,
        })
      ).unwrap();

      // Clear the state after successful save
      setNotes([]);
      setFiles([]);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await dispatch(deleteNoteFromDb(noteId)).unwrap();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };
  useEffect(() => {
    setHasUnsavedChanges(notes.length > 0 || files.length > 0);
  }, [notes, files]);
  console.log("files: ", files);
  console.log("notes: ", notes);
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);
  return (
    <div className="mx-16 px-4 py-8">
      {/* Header with Save Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">My Notes</h1>
        {hasUnsavedChanges && (
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save size={16} />
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-12 gap-4 min-h-[500px]">
        <div className=" col-span-12 md:col-span-6">
          {/* Note Input */}
          <div className="mb-8 space-y-4">
            <div className="relative space-y-2">
              <input
                type="text"
                value={noteInput.title}
                onChange={(e) =>
                  setNoteInput((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Note title..."
                className="w-full bg-transparent text-lg font-medium border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0"
              />
              <div className="h-px bg-gray-200" />
              <textarea
                value={noteInput.content}
                onChange={(e) =>
                  setNoteInput((prev) => ({ ...prev, content: e.target.value }))
                }
                onKeyDown={handleKeyPress}
                placeholder="Type a note..."
                className="w-full resize-none bg-transparent text-lg border-none outline-none placeholder:text-gray-400 focus:ring-0 p-0 min-h-[42px]"
                rows={5}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleFileClick}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <Plus size={16} />
                Add File
              </Button>
              <Button
                onClick={handleAddNote}
                disabled={!noteInput.title.trim() || !noteInput.content.trim()}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <Plus size={16} />
                Add Note
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Notes List */}
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div
                key={index}
                className="group relative bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-all"
              >
                <h2 className="font-semibold text-gray-800 mb-2">{note.title}</h2>
                <p className="pr-8 text-gray-700">{note.content}</p>
                <button
                  onClick={() => deleteNote(index)}
                  className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            ))}

            {/* Files List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-all"
                  >
                    <File size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 truncate flex-1">
                      {file.name}
                    </span>
                    <button
                      onClick={() => deleteFile(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X
                        size={16}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Show PDF */}
        <div className="col-span-12 md:col-span-6">

         <ViewPDF />
        </div>
      </div>

      {/* Note Display */}
      <DisplayNotes
        fehLoading={fehLoading}
        savedNotes={savedNotes}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default MyNotes;
