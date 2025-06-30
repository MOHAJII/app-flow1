import React, { useState } from 'react';
import { Scan, Shield, GraduationCap, User } from 'lucide-react';

interface DevicePanelProps {
  status: string;
  onUserScan: (userType: 'security' | 'teacher' | 'student', userName: string) => void;
  currentUser: string;
  userType: 'security' | 'teacher' | 'student' | null;
}

export const DevicePanel: React.FC<DevicePanelProps> = ({ 
  status, 
  onUserScan, 
  currentUser,
  userType 
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showHand, setShowHand] = useState(false);

  const handleScan = async (type: 'security' | 'teacher' | 'student', name: string) => {
    if (isScanning) return;
    
    setIsScanning(true);
    setShowHand(true);
    
    await onUserScan(type, name);
    
    setTimeout(() => {
      setShowHand(false);
      setIsScanning(false);
    }, 8000);
  };

  const getStatusColor = () => {
    if (status.includes('Ready')) return 'text-green-600';
    if (status.includes('Identifying')) return 'text-yellow-600';
    if (status.includes('Identified')) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">HeyStar Palm Vein Device</h2>
        <p className="text-sm text-gray-600">Advanced Biometric Access Control</p>
      </div>

      {/* Device Visualization */}
      <div className="relative mb-6">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-4 mx-auto w-48 h-32">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-md w-full h-16 flex items-center justify-center relative overflow-hidden">
            <Scan className="w-8 h-8 text-white animate-pulse" />
            <div className="absolute inset-0 bg-blue-300 opacity-30 animate-ping"></div>
            
            {/* Hand Animation */}
            {showHand && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-8 bg-orange-200 rounded-full opacity-80 animate-pulse"></div>
              </div>
            )}
          </div>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-300">Palm Scan Area</span>
          </div>
        </div>
        
        {/* Status Display */}
        <div className="mt-4 text-center">
          <div className={`font-semibold ${getStatusColor()}`}>
            {status}
          </div>
          {currentUser && (
            <div className="text-sm text-gray-500 mt-1">
              Type: {userType?.charAt(0).toUpperCase() + userType?.slice(1)}
            </div>
          )}
        </div>
      </div>

      {/* Scan Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleScan('security', 'RACHID')}
          disabled={isScanning}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Shield className="w-4 h-4" />
          Scan as Security Agent (RACHID)
        </button>
        
        <button
          onClick={() => handleScan('teacher', 'AHMED')}
          disabled={isScanning}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GraduationCap className="w-4 h-4" />
          Scan as Teacher (AHMED - Biology 101)
        </button>
        
        <button
          onClick={() => handleScan('student', 'MOHAMMED')}
          disabled={isScanning}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <User className="w-4 h-4" />
          Scan as Student (MOHAMMED)
        </button>
      </div>

      {/* Technical Specs */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Device Features</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Palm Vein Recognition (recModePalmEnable)</li>
          <li>• TCP Communication Protocol</li>
          <li>• Relay Control (pciRelayDelay: 1000ms)</li>
          <li>• Real-time Identification Records</li>
        </ul>
      </div>
    </div>
  );
};