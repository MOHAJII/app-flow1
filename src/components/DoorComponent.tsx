import React from 'react';
import { DoorOpen, DoorClosed } from 'lucide-react';

interface DoorComponentProps {
  isOpen: boolean;
}

export const DoorComponent: React.FC<DoorComponentProps> = ({ isOpen }) => {
  return (
    <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
      <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-300">
        <div className="relative w-16 h-24">
          {/* Door Frame */}
          <div className="absolute inset-0 border-4 border-brown-600 rounded-sm bg-brown-100"></div>
          
          {/* Door */}
          <div 
            className={`absolute inset-1 bg-gradient-to-b from-amber-700 to-amber-800 rounded-sm transition-all duration-500 transform-gpu ${
              isOpen ? 'rotate-y-90 opacity-50' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center'
            }}
          >
            {/* Door Handle */}
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-2 bg-yellow-400 rounded-full"></div>
          </div>
          
          {/* Door Status Icon */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            {isOpen ? (
              <DoorOpen className="w-5 h-5 text-green-600" />
            ) : (
              <DoorClosed className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </div>
        
        <div className="text-center mt-2">
          <span className="text-xs font-medium text-gray-700">
            {isOpen ? 'OPEN' : 'CLOSED'}
          </span>
        </div>
      </div>
    </div>
  );
};