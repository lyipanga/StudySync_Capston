// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FileText, Eye, Download, Loader2, X } from "lucide-react";
// import { fetchUploadedFiles } from "@/store/upload/uploadTextBookThunk";

// const ViewPDF = () => {
//   const dispatch = useDispatch();
//   const { files, fetchloading } = useSelector((state) => state.textBooks);
//   const [viewFile, setViewFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     dispatch(fetchUploadedFiles());
//   }, [dispatch]);

//   const handleViewPDF = (file) => {
//     setViewFile(file);
//   };

//   return (
//     <div className="w-full bg-red-200 mx-auto p-4">
//       <div className="grid grid-cols-1 bg-yellow-200 md:grid-cols-2 gap-4">
//         {/* PDF List Section */}
//         <div className="space-y-4 bg-green-200 w-[100%]">
//           <div className="flex  place-items-center gap-4 ">
//             <button
//               onClick={() => setViewFile(null)}
//               className="text-blue-500 hover:text-blue-600 mb-4"
//             >
//               arrow icon
//             </button>
//             <h2 className="text-2xl font-bold mb-4">PDF Files</h2>
//           </div>

//           {fetchloading ? (
//             <div className="flex items-center justify-center p-8">
//               <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//             </div>
//           ) : (
//             <>
//               {" "}
//               {viewFile ? (
//                 <div className="bg-gray-100 rounded-lg p-4 min-h-[500px]">
//                   <div className="h-full">
//                     <h3 className="text-lg font-semibold mb-2">
//                       {viewFile.fileName}
//                     </h3>
//                     <iframe
//                       src={viewFile.filePath}
//                       className="w-[100%] h-[600px] rounded-lg border border-gray-200"
//                       title={viewFile.fileName}
//                     />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {files?.map((file) => (
//                     <div
//                       key={file.id}
//                       className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
//                       onClick={() => handleViewPDF(file)}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                           <FileText className="h-6 w-6 text-blue-500" />
//                           <div>
//                             <p className="font-medium truncate max-w-xs">
//                               {file.fileName}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               {file.createdAt}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewPDF;


"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileText, Eye, Download, Loader2, ArrowLeft } from "lucide-react";
import { fetchUploadedFiles } from "@/store/upload/uploadTextBookThunk";

const ViewPDF = () => {
  const dispatch = useDispatch();
  const { files, fetchloading } = useSelector((state) => state.textBooks);
  const [viewFile, setViewFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUploadedFiles());
  }, [dispatch]);

  const handleViewPDF = (file) => {
    setViewFile(file);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full max-w-full p-4">
        <div className="grid grid-cols-1 gap-4">
          {/* PDF List Section */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-6">
              {viewFile && (
                <button
                  onClick={() => setViewFile(null)}
                  className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              )}
              <h2 className="text-2xl font-bold">PDF Files</h2>
            </div>

            {fetchloading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : (
              <>
                {viewFile ? (
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="h-full">
                      <h3 className="text-lg font-semibold mb-4">
                        {viewFile.fileName}
                      </h3>
                      <iframe
                        src={viewFile.filePath}
                        className="w-full h-[80vh] rounded-lg border border-gray-200"
                        title={viewFile.fileName}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {files?.map((file) => (
                      <div
                        key={file.id}
                        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => handleViewPDF(file)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-6 w-6 text-blue-500" />
                            <div>
                              <p className="font-medium truncate max-w-xs">
                                {file.fileName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {file.createdAt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPDF;