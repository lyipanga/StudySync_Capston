

// "use client";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Plus, Save, Trash } from "lucide-react";
// import { Toaster } from "react-hot-toast";
// import {
//   addFlashcard,
//   deleteFlashcard,
//   fetchFlashcards,
// } from "@/store/flashcard/flashCardThunk";

// const FlashCard = () => {
//   const dispatch = useDispatch();
//   const { cards, loading } = useSelector((state) => state.flashcards);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [showAnswers, setShowAnswers] = useState({});

//   useEffect(() => {
//     dispatch(fetchFlashcards());
//   }, [dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (question.trim() && answer.trim()) {
//       dispatch(addFlashcard({ question, answer }));
//       setQuestion("");
//       setAnswer("");
//     }
//   };

//   const handleDelete = async (id, e) => {
//     e.stopPropagation();
//     dispatch(deleteFlashcard(id));
//   };

//   const toggleAnswer = (id) => {
//     setShowAnswers((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <Toaster position="top-right" />
//       <div className="max-w-6xl mx-auto">
//         {/* Form */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Create New Flashcard
//             </h2>
//             <p className="text-gray-500 mt-1">
//               Add your question and answer below
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 gap-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Question
//                 </label>
//                 <input
//                   type="text"
//                   value={question}
//                   onChange={(e) => setQuestion(e.target.value)}
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                   placeholder="Enter your question..."
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Answer
//                 </label>
//                 <textarea
//                   value={answer}
//                   onChange={(e) => setAnswer(e.target.value)}
//                   rows="4"
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
//                   placeholder="Enter your answer..."
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
//             >
//               <Save className="w-5 h-5" />
//               Save Flashcard
//             </button>
//           </form>
//         </div>

//         {/* Cards Grid */}
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cards.map((card) => (
//               <div
//                 key={card.id}
//                 onClick={() => toggleAnswer(card.id)}
//                 className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
//               >
//                 <div className="p-6">
//                   <div className="flex flex-col min-h-[12rem]">
//                     <div className="flex justify-between items-start mb-4">
//                       <h3 className="text-lg font-medium text-gray-800">
//                         {showAnswers[card.id] ? "Answer" : "Question"}
//                       </h3>
//                       <button
//                         onClick={(e) => handleDelete(card.id, e)}
//                         className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
//                       >
//                         <Trash className="w-5 h-5" />
//                       </button>
//                     </div>
                    
//                     <div className="flex-1 flex items-center justify-center">
//                       <p className="text-gray-700 text-center">
//                         {showAnswers[card.id] ? card.answer : card.question}
//                       </p>
//                     </div>
                    
//                     <p className="text-sm text-gray-500 text-center mt-4">
//                       {showAnswers[card.id] 
//                         ? "Click to see question" 
//                         : "Click to reveal answer"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!loading && cards.length === 0 && (
//           <div className="text-center py-12 text-gray-500">
//             <Plus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
//             <p className="text-lg">No flashcards yet</p>
//             <p className="text-sm mt-1">
//               Create your first flashcard to get started
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FlashCard;
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Save, Trash } from "lucide-react";
import { Toaster } from "react-hot-toast";
import {
  addFlashcard,
  deleteFlashcard,
  fetchFlashcards,
} from "@/store/flashcard/flashCardThunk";

const FlashCard = () => {
  const dispatch = useDispatch();
  const { cards, loading } = useSelector((state) => state.flashcards);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    dispatch(fetchFlashcards());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      dispatch(addFlashcard({ question, answer }));
      setQuestion("");
      setAnswer("");
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    dispatch(deleteFlashcard(id));
  };

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <style jsx global>{`
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-[#1f2937]">
              Create New Flashcard
            </h2>
            <p className="text-[#64748b] mt-1">
              Add your question and answer below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#334155]">
                  Question
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your question..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#334155]">
                  Answer
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Enter your answer..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
            >
              <Save className="w-5 h-5" />
              Save Flashcard
            </button>
          </form>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563eb]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`flip-card cursor-pointer h-64 ${flippedCards[card.id] ? 'flipped' : ''}`}
                onClick={() => toggleFlip(card.id)}
              >
                <div className="flip-card-inner">
                  {/* Question Side (Front) */}
                  <div className="flip-card-front">
                    <div className="h-full bg-white rounded-xl shadow-lg p-6">
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium ">
                            Question
                          </h3>
                          <button
                            onClick={(e) => handleDelete(card.id, e)}
                            className="text-dark/70 hover:text-dark transition-colors"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-dark text-center flex items-center justify-center flex-1 font-medium">
                          {card.question}
                        </p>
                        <p className="text-sm text-dark text-center font-medium">
                          Click to see answer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Answer Side (Back) */}
                  <div className="flip-card-back">
                    <div className="h-full bg-green-500 rounded-xl shadow-lg p-6">
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-medium text-white">
                            Answer
                          </h3>
                          <button
                            onClick={(e) => handleDelete(card.id, e)}
                            className="text-white/70 hover:text-white transition-colors"
                          >
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-white text-center flex items-center justify-center flex-1 font-medium">
                          {card.answer}
                        </p>
                        <p className="text-sm text-[#bfdbfe] text-center font-medium">
                          Click to see question
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && cards.length === 0 && (
          <div className="text-center py-12 text-[#64748b]">
            <Plus className="w-12 h-12 mx-auto mb-4 text-[#94a3b8]" />
            <p className="text-lg">No flashcards yet</p>
            <p className="text-sm mt-1">
              Create your first flashcard to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCard;