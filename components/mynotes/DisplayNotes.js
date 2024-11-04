// import React from "react";
// import { File, Trash2, ChevronDown, ChevronUp } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "../ui/alert-dialog";
// import { useState } from "react";

// const DisplayNotes = ({ fehLoading, savedNotes, handleDeleteNote }) => {
//   const [expandedNotes, setExpandedNotes] = useState({});

//   const toggleNoteExpansion = (noteId) => {
//     setExpandedNotes(prev => ({
//       ...prev,
//       [noteId]: !prev[noteId]
//     }));
//   };

//   if (fehLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px]">
//         <div className="animate-pulse flex flex-col items-center gap-4">
//           <div className="h-8 w-8 rounded-full bg-gray-200 animate-spin" />
//           <p className="text-gray-500">Loading your notes...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 mt-8">
//       <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
//         Your Notes Collection
//       </h2>
      
//       <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {savedNotes.map((note) => (
//           <div
//             key={note.id}
//             className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
//           >
//             {/* Card Header */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 flex items-center justify-between">
//               <h3 className="font-semibold text-gray-800">
//                 {note.notes[0]?.title || "Untitled Note"}
//               </h3>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => toggleNoteExpansion(note.id)}
//                   className="p-1 hover:bg-white rounded-full transition-colors"
//                 >
//                   {expandedNotes[note.id] ? (
//                     <ChevronUp className="h-5 w-5 text-gray-600" />
//                   ) : (
//                     <ChevronDown className="h-5 w-5 text-gray-600" />
//                   )}
//                 </button>
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <button className="p-1 hover:bg-white rounded-full transition-colors">
//                       <Trash2 className="h-5 w-5 text-red-400 hover:text-red-500" />
//                     </button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Delete Note</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         This will permanently remove this note and all its attachments. 
//                         This action cannot be undone.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel className="hover:bg-gray-100">Cancel</AlertDialogCancel>
//                       <AlertDialogAction
//                         onClick={() => handleDeleteNote(note.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white"
//                       >
//                         Delete
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </div>
//             </div>

//             {/* Card Content */}
//             <div className={`overflow-hidden transition-all duration-200 ${
//               expandedNotes[note.id] ? 'max-h-[500px]' : 'max-h-32'
//             }`}>
//               <div className="p-4">
//                 {note.notes.map((individualNote, index) => (
//                   <div key={index} className="mb-4">
//                     {index !== 0 && (
//                       <h4 className="font-medium text-gray-700 mb-1">
//                         {individualNote.title}
//                       </h4>
//                     )}
//                     <p className="text-gray-600 text-sm line-clamp-3">
//                       {individualNote.content}
//                     </p>
//                   </div>
//                 ))}

//                 {/* Files Section */}
//                 {note.files && note.files.length > 0 && (
//                   <div className="mt-4 pt-4 border-t border-gray-100">
//                     <h4 className="text-sm font-medium text-gray-700 mb-2">
//                       Attachments
//                     </h4>
//                     <div className="space-y-2">
//                       {note.files.map((file, index) => (
//                         <a
//                           key={index}
//                           href={file.downloadURL}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
//                         >
//                           <File size={14} />
//                           <span className="truncate">{file.fileName}</span>
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Card Footer */}
//               <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">
//                 Created: {note.createdAt}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {savedNotes.length === 0 && (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <p className="text-gray-500">No notes yet. Start by creating your first note!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DisplayNotes;
import React, { useState } from "react";
import { File, Trash2, Clock, ChevronRight, ArrowLeft } from "lucide-react";
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

const DisplayNotes = ({ fehLoading, savedNotes, handleDeleteNote }) => {
  const [activeNote, setActiveNote] = useState(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const handleNoteSelect = (note) => {
    setActiveNote(note);
    setShowMobileDetail(true);
  };

  const handleBackToList = () => {
    setShowMobileDetail(false);
  };

  if (fehLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"/>
          <p className="text-gray-600 font-medium">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Notes
          </h2>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {savedNotes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-12 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No Notes Yet</h3>
              <p className="text-gray-500">Start creating notes to see them displayed here.</p>
            </div>
          </div>
        ) : (
          <div className="lg:flex gap-6">
            {/* Notes List */}
            <div className={`lg:w-1/3 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 ${
              showMobileDetail ? 'hidden lg:block' : 'block'
            }`}>
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">All Notes</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {savedNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => handleNoteSelect(note)}
                    className={`p-4 cursor-pointer transition-all hover:bg-gray-50 flex items-center justify-between group ${
                      activeNote?.id === note.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 mb-1 truncate">
                        {note.notes[0]?.title || "Untitled Note"}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {note.notes[0]?.content}
                      </p>
                    </div>
                    <ChevronRight 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        activeNote?.id === note.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Note Detail */}
            <div className={`flex-1 mt-6 lg:mt-0 ${
              !showMobileDetail ? 'hidden lg:block' : 'block'
            }`}>
              {activeNote ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-4 md:p-6 border-b border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={handleBackToList}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                          {activeNote.notes[0]?.title}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Clock size={14} />
                          Created: {activeNote.createdAt}
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors group">
                            <Trash2 className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:max-w-[425px]">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Note</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this note and its attachments.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                handleDeleteNote(activeNote.id);
                                setActiveNote(null);
                                setShowMobileDetail(false);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <div className="space-y-6">
                      {activeNote.notes.map((note, index) => (
                        <div key={index} className="prose max-w-none">
                          {index !== 0 && (
                            <h4 className="text-lg font-medium text-gray-800 mb-2">
                              {note.title}
                            </h4>
                          )}
                          <p className="text-gray-600 whitespace-pre-wrap">
                            {note.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    {activeNote.files && activeNote.files.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-4">
                          Attachments ({activeNote.files.length})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {activeNote.files.map((file, index) => (
                            <a
                              key={index}
                              href={file.downloadURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                            >
                              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <File size={16} className="text-blue-600" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-sm text-gray-700 truncate">
                                  {file.fileName}
                                </p>
                                <p className="text-xs text-gray-500">PDF Document</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-12 text-center border border-gray-100">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      Select a Note
                    </h3>
                    <p className="text-gray-500">
                      Choose a note from the list to view its details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayNotes;