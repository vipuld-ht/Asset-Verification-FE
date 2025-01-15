import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
const DropzoneComponent = ({ acceptedFileTypes, maxFiles, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
  });

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles); // Pass files to parent or upload logic
      setSelectedFiles([]); // Clear selected files after upload
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-64 p-4 border-2 border-dashed rounded-lg 
        ${
          isDragActive
            ? "border-blue-500 bg-blue-100"
            : "border-gray-300 bg-gray-50"
        } transition-all duration-200 ease-in-out`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="text-blue-500 font-medium">Drop the files here...</p>
          ) : (
            <p className="text-gray-500 font-medium">
              Drag & drop files here, or click to select files
            </p>
          )}
          <p className="text-sm text-gray-400">
            Accepted file types: {acceptedFileTypes.join(", ")}
          </p>
        </div>
      </div>

      {/* File Previews */}
      {selectedFiles.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Selected Files:</h2>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(2)} KB)
                  </span>
                </div>
                {file.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      {selectedFiles.length > 0 && (
        <button
          onClick={handleUpload}
          className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all duration-200"
        >
          Upload Files
        </button>
      )}
    </div>
  );
};

export default DropzoneComponent;
