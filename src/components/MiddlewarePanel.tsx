import React from 'react';
import { Server, ArrowRight, Zap, Activity } from 'lucide-react';

interface MiddlewarePanelProps {
  status: string;
  activeProtocol: 'none' | 'tcp' | 'http';
}

export const MiddlewarePanel: React.FC<MiddlewarePanelProps> = ({ status, activeProtocol }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 relative">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">HeyStar Middleware</h2>
        <p className="text-sm text-gray-600">TCP to HTTP Gateway</p>
      </div>

      {/* Server Visualization */}
      <div className="relative mb-6">
        <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-4 mx-auto w-40 h-24">
          <div className="flex items-center justify-center h-full">
            <Server className="w-12 h-12 text-blue-400" />
            {status.includes('Processing') || status.includes('Converting') ? (
              <Activity className="absolute w-6 h-6 text-yellow-400 animate-spin" style={{ top: '10px', right: '10px' }} />
            ) : null}
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className="font-semibold text-gray-700">{status}</div>
        </div>
      </div>

      {/* Protocol Indicators */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">TCP Input</div>
          <div className={`w-3 h-3 rounded-full ${activeProtocol === 'tcp' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}></div>
        </div>
        
        <div className="flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">HTTP Output</div>
          <div className={`w-3 h-3 rounded-full ${activeProtocol === 'http' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
        </div>
      </div>

      {/* API Endpoints Display */}
      {activeProtocol !== 'none' && (
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Active Endpoint</h4>
          <div className="text-xs text-gray-600 font-mono">
            {activeProtocol === 'http' && status.includes('Request') && '/sevUploadRecRecordUrl'}
            {activeProtocol === 'http' && status.includes('Command') && '/api/device/output'}
            {activeProtocol === 'tcp' && 'TCP Socket Communication'}
          </div>
        </div>
      )}

      {/* Connection Lines */}
      <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
        <div className={`w-12 h-0.5 ${activeProtocol === 'tcp' ? 'border-dashed border-2 border-blue-500 animate-pulse' : 'bg-gray-300'}`}></div>
        <div className="text-xs text-blue-600 font-semibold mt-1">TCP</div>
      </div>
      
      <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
        <div className={`w-12 h-0.5 ${activeProtocol === 'http' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
        <div className="text-xs text-green-600 font-semibold mt-1">HTTP</div>
      </div>

      {/* Technical Details */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-700 mb-2">Middleware Functions</h4>
        <ul className="text-xs text-blue-600 space-y-1">
          <li>• Protocol Translation (TCP ↔ HTTP)</li>
          <li>• Device Communication Bridge</li>
          <li>• Record Upload Processing</li>
          <li>• Command Relay Management</li>
        </ul>
      </div>
    </div>
  );
};