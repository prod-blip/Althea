import React, { useState } from 'react';
import { User, FileText, Upload, Brain, Heart, LogOut, Settings, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FileUpload from './FileUpload';
import ButtonComponent from '../ui/ButtonComponent';
import { apiRequest } from '../../config/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setAnalysisResult(null);
    setAnalysisError('');
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setAnalysisError('');

    try {
      // Convert file to base64
      const base64File = await fileToBase64(uploadedFile);

      // Send to OpenAI analysis endpoint
      const response = await apiRequest('/api/analyze/', {
        method: 'POST',
        body: JSON.stringify({
          file: base64File,
          file_type: uploadedFile.type,
          file_name: uploadedFile.name
        })
      });

      if (response.success) {
        setAnalysisResult(response.analysis);
      } else {
        setAnalysisError(response.error || 'Analysis failed');
      }

    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisError('Failed to analyze report. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Althea</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">{user?.name || user?.email}</span>
              </div>
              <ButtonComponent
                size="sm"
                variant="secondary"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </ButtonComponent>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-gray-600">
            Upload your medical reports to get instant, plain-English explanations and personalized questions for your doctor.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-600 text-sm">Reports Analyzed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-600 text-sm">AI Insights</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">Ready</p>
                <p className="text-gray-600 text-sm">System Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* File Upload */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Medical Report
            </h2>
            <FileUpload onFileUpload={handleFileUpload} />

            {uploadedFile && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">File uploaded successfully!</p>
                    <p className="text-green-600 text-sm">{uploadedFile.name}</p>
                  </div>
                  <ButtonComponent
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex items-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4" />
                        <span>Analyze Report</span>
                      </>
                    )}
                  </ButtonComponent>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Analysis Results
            </h2>

            {!analysisResult && !isAnalyzing && (
              <div className="text-center py-8">
                <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Upload a medical report to see AI analysis here</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Analyzing your report with AI...</p>
              </div>
            )}

            {analysisError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">Analysis Error</p>
                  <p className="text-red-600 text-sm">{analysisError}</p>
                </div>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6">
                {/* Urgent Concerns */}
                {analysisResult.urgent_concerns && analysisResult.urgent_concerns.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-red-900 mb-2">⚠️ Urgent Concerns</h3>
                        <ul className="space-y-1">
                          {analysisResult.urgent_concerns.map((concern, index) => (
                            <li key={index} className="text-red-800 text-sm">• {concern}</li>
                          ))}
                        </ul>
                        <p className="text-red-700 text-sm mt-2 font-medium">
                          Please contact your healthcare provider immediately.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Summary</span>
                  </h3>
                  <p className="text-gray-700 bg-blue-50 p-4 rounded-lg leading-relaxed">
                    {analysisResult.summary}
                  </p>
                </div>

                {/* Key Findings */}
                {analysisResult.key_findings && analysisResult.key_findings.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Key Findings</span>
                    </h3>
                    <ul className="space-y-2">
                      {analysisResult.key_findings.map((finding, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Questions for Doctor */}
                {analysisResult.questions_for_doctor && analysisResult.questions_for_doctor.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                      <HelpCircle className="w-5 h-5 text-purple-600" />
                      <span>Questions to Ask Your Doctor</span>
                    </h3>
                    <ul className="space-y-2">
                      {analysisResult.questions_for_doctor.map((question, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reassurance */}
                {analysisResult.reassurance && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Heart className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-green-900 mb-1">💚 Reassurance</h3>
                        <p className="text-green-800 text-sm">{analysisResult.reassurance}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <ButtonComponent
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setUploadedFile(null);
                      setAnalysisResult(null);
                      setAnalysisError('');
                    }}
                  >
                    Analyze Another Report
                  </ButtonComponent>
                  <ButtonComponent
                    variant="secondary"
                    size="sm"
                    onClick={() => window.print()}
                  >
                    Print Results
                  </ButtonComponent>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ButtonComponent variant="secondary" className="flex items-center justify-center space-x-2 py-3">
              <FileText className="w-5 h-5" />
              <span>View Sample Report</span>
            </ButtonComponent>
            <ButtonComponent variant="secondary" className="flex items-center justify-center space-x-2 py-3">
              <Brain className="w-5 h-5" />
              <span>Learn About AI Analysis</span>
            </ButtonComponent>
            <ButtonComponent variant="secondary" className="flex items-center justify-center space-x-2 py-3">
              <Settings className="w-5 h-5" />
              <span>Account Settings</span>
            </ButtonComponent>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;