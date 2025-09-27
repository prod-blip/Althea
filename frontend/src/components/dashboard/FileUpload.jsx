import React, { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle, CheckCircle } from 'lucide-react';
import ButtonComponent from '../ui/ButtonComponent';

const FileUpload = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Accepted file types for medical reports
  const acceptedTypes = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      return 'Please upload a PDF, image (PNG/JPG), or Word document';
    }
    if (file.size > maxFileSize) {
      return 'File size must be less than 10MB';
    }
    return null;
  };

  const handleFile = (file) => {
    setUploadError('');

    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }

    setUploadedFile(file);
    onFileUpload(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!uploadedFile ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className={`w-12 h-12 mx-auto mb-4 ${
            isDragging ? 'text-blue-500' : 'text-gray-400'
          }`} />

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Medical Report
          </h3>

          <p className="text-gray-600 mb-4">
            Drag and drop your medical report here, or click to browse
          </p>

          <ButtonComponent
            variant="primary"
            onClick={handleBrowseClick}
            className="mb-4"
          >
            Choose File
          </ButtonComponent>

          <p className="text-sm text-gray-500">
            Supports PDF, images (PNG, JPG), and Word documents up to 10MB
          </p>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            onChange={handleFileSelect}
          />
        </div>
      ) : (
        /* Uploaded File Display */
        <div className="border border-gray-300 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {uploadedFile.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatFileSize(uploadedFile.size)} • {uploadedFile.type.split('/')[1].toUpperCase()}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">Ready for analysis</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Upload Error</p>
            <p className="text-red-600 text-sm">{uploadError}</p>
          </div>
        </div>
      )}

      {/* Upload Instructions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Upload Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Ensure text is clear and readable</li>
          <li>• Lab results, imaging reports, and discharge summaries work best</li>
          <li>• Remove any sensitive information you don't want analyzed</li>
          <li>• Higher quality images provide better analysis</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;