"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadTextBooks } from "@/store/upload/uploadTextBookThunk";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import TextBookTable from "./TextBookTable";

export default function UploadTextBook() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const loading = useSelector((state) => state.textBooks.loading);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      dispatch(
        uploadTextBooks({
          file: selectedFile,
          path: "textbooks",
        })
      );
      setSelectedFile(null);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen  p-6 flex flex-col items-center justify-center">
      <div className="w-full  bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Upload Your Textbook
          </h1>
          <p className="text-gray-500 mt-2">
            Select your file to begin the upload process
          </p>
        </div>

        <div className="space-y-6">
          {/* Upload Area */}
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={loading}
            />
            <label
              htmlFor="file-upload"
              className={`
                flex flex-col items-center justify-center w-full
                h-48 px-4 transition-colors duration-150 ease-in-out
                border-2 border-dashed rounded-lg
                ${
                  selectedFile
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400 bg-gray-50"
                }
                cursor-pointer
              `}
            >
              {!selectedFile ? (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-700 font-medium">
                    Drop your file here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Maximum file size: 10MB
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <FileText className="w-12 h-12 text-blue-500 mb-3" />
                  <div className="text-center">
                    <p className="text-blue-600 font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      clearSelection();
                    }}
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              )}
            </label>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className={`
              w-full py-3 px-4 rounded-lg font-medium
              transition-all duration-150 ease-in-out
              flex items-center justify-center space-x-2
              ${
                loading
                  ? "bg-gray-100 text-green-500 cursor-not-allowed"
                  : selectedFile
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {loading ? (
              <>
                {/* <div className="w-5 h-5 text-green-500 border-t-2 border-b-2 border-white rounded-full animate-spin" /> */}
                <Loader2 className="w-5 h-5 animate-spin text-green-500" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Upload File</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="w-full  bg-white rounded-xl  mt-6 shadow-lg p-8">
        <TextBookTable />
      </div>
    </div>
  );
}
