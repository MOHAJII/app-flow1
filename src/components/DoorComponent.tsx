import React from 'react';
import { DoorOpen, DoorClosed } from 'lucide-react';

interface DoorComponentProps {
  isOpen: boolean;
}

export const DoorComponent: React.FC<DoorComponentProps> = ({ isOpen }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Access Door</h3>
        <p className="text-sm text-gray-600">Controlled Entry Point</p>
      </div>
      
      <div className="relative w-32 h-48 mx-auto">
        {/* Door Frame */}
        <div className="absolute inset-0 border-8 border-amber-800 rounded-lg bg-amber-100 shadow-inner"></div>
        
        {/* Door */}
        <div 
          className={`absolute inset-2 bg-gradient-to-b from-amber-700 to-amber-900 rounded-md transition-all duration-700 transform-gpu shadow-lg ${
            isOpen ? 'rotate-y-75 scale-x-75 opacity-60' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center'
          }}
        >
          {/* Door Handle */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-yellow-400 rounded-full shadow-md"></div>
          
          {/* Door Panels */}
          <div className="absolute inset-4 border-2 border-amber-600 rounded opacity-30"></div>
          <div className="absolute left-4 right-4 top-8 bottom-8 border border-amber-600 rounded opacity-20"></div>
        </div>
        
        {/* Door Status Icon */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className={`p-2 rounded-full ${isOpen ? 'bg-green-100' : 'bg-gray-100'}`}>
            {isOpen ? (
              <DoorOpen className="w-6 h-6 text-green-600" />
            ) : (
              <DoorClosed className="w-6 h-6 text-gray-600" />
            )}
          </div>
        </div>

        {/* Status Light */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`w-4 h-4 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'} shadow-lg`}></div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <span className={`text-lg font-bold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
          {isOpen ? 'OPEN' : 'CLOSED'}
        </span>
        <p className="text-xs text-gray-500 mt-1">
          {isOpen ? 'Access Granted' : 'Access Controlled'}
        </p>
      </div>
    </div>
  );
};