import React, { useState } from 'react';
import { Scan, Shield, GraduationCap, User, DoorOpen, DoorClosed } from 'lucide-react';

interface IntegratedAccessPointProps {
  deviceStatus: string;
  isDoorOpen: boolean;
  onUserScan: (userType: 'security' | 'teacher' | 'student', userName: string) => void;
  currentUser: string;
  userType: 'security' | 'teacher' | 'student' | null;
}

export const IntegratedAccessPoint: React.FC<IntegratedAccessPointProps> = ({ 
  deviceStatus,
  isDoorOpen,
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
    if (deviceStatus.includes('Ready')) return 'text-green-600';
    if (deviceStatus.includes('Identifying')) return 'text-yellow-600';
    if (deviceStatus.includes('Identified')) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 text-center">
        <h2 className="text-lg font-bold mb-1">Integrated Access Control</h2>
        <p className="text-sm opacity-90">HeyStar Palm Vein Security System</p>
      </div>

      {/* Main Integration Area */}
      <div className="p-6">
        <div className="flex items-stretch gap-4 mb-6">
          {/* Palm Scanner Device */}
          <div className="flex-1">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-4 h-40">
              {/* Scanner Display */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-md w-full h-20 flex items-center justify-center relative overflow-hidden mb-3">
                <Scan className="w-8 h-8 text-white animate-pulse" />
                <div className="absolute inset-0 bg-blue-300 opacity-30 animate-ping"></div>
                
                {/* Hand Animation */}
                {showHand && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-8 bg-orange-200 rounded-full opacity-80 animate-pulse"></div>
                  </div>
                )}
              </div>
              
              {/* Device Info */}
              <div className="text-center">
                <span className="text-xs text-gray-300 block">Palm Scan Area</span>
                <div className="flex justify-center mt-2 space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
            
            {/* Scanner Status */}
            <div className="mt-3 text-center">
              <div className={`font-semibold text-sm ${getStatusColor()}`}>
                {deviceStatus}
              </div>
              {currentUser && (
                <div className="text-xs text-gray-500 mt-1">
                  User: {currentUser} ({userType?.charAt(0).toUpperCase() + userType?.slice(1)})
                </div>
              )}
            </div>
          </div>

          {/* Door Integration */}
          <div className="flex-1">
            <div className="relative h-40 bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg border-4 border-amber-800 flex items-center justify-center">
              {/* Door Frame */}
              <div className="absolute inset-2 border-4 border-amber-700 rounded-md bg-gradient-to-b from-amber-600 to-amber-800 shadow-inner">
                {/* Door */}
                <div 
                  className={`absolute inset-1 bg-gradient-to-b from-amber-700 to-amber-900 rounded transition-all duration-700 transform-gpu ${
                    isDoorOpen ? 'rotate-y-75 scale-x-75 opacity-60' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center'
                  }}
                >
                  {/* Door Handle */}
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-3 bg-yellow-400 rounded-full shadow-md"></div>
                  
                  {/* Door Panels */}
                  <div className="absolute inset-3 border border-amber-600 rounded opacity-40"></div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className={`p-1 rounded-full ${isDoorOpen ? 'bg-green-100' : 'bg-red-100'}`}>
                  {isDoorOpen ? (
                    <DoorOpen className="w-4 h-4 text-green-600" />
                  ) : (
                    <DoorClosed className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>

              {/* Access Light */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                <div className={`w-3 h-3 rounded-full ${isDoorOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'} shadow-lg`}></div>
              </div>
            </div>
            
            {/* Door Status */}
            <div className="mt-3 text-center">
              <span className={`text-sm font-bold ${isDoorOpen ? 'text-green-600' : 'text-red-600'}`}>
                {isDoorOpen ? 'ACCESS GRANTED' : 'ACCESS SECURED'}
              </span>
            </div>
          </div>
        </div>

        {/* Control Panel */}
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

        {/* Technical Specifications */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Scan className="w-4 h-4" />
            System Specifications
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
            <div>
              <div className="font-medium mb-1">Scanner Features:</div>
              <ul className="space-y-1">
                <li>• Palm Vein Recognition</li>
                <li>• TCP Communication</li>
                <li>• Real-time Processing</li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-1">Access Control:</div>
              <ul className="space-y-1">
                <li>• Relay Control (1000ms)</li>
                <li>• Status Monitoring</li>
                <li>• Security Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};