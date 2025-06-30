import React from 'react';
import { Database, Monitor, Users, CheckCircle2 } from 'lucide-react';
import { SessionData } from '../App';

interface SchoolAppPanelProps {
  status: string;
  currentSession: SessionData | null;
}

export const SchoolAppPanel: React.FC<SchoolAppPanelProps> = ({ status, currentSession }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">School Management System</h2>
        <p className="text-sm text-gray-600">Custom Application</p>
      </div>

      {/* App Visualization */}
      <div className="relative mb-6">
        <div className="bg-gradient-to-b from-green-600 to-green-700 rounded-lg p-4 mx-auto w-40 h-24 flex items-center justify-center">
          <Monitor className="w-12 h-12 text-white" />
          <Database className={`absolute w-6 h-6 text-yellow-300 ${status.includes('Checking') ? 'animate-pulse' : ''}`} style={{ top: '10px', right: '10px' }} />
        </div>
        
        <div className="mt-4 text-center">
          <div className="font-semibold text-gray-700 text-sm">{status}</div>
        </div>
      </div>

      {/* Current Session Display */}
      {currentSession ? (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Current Session
          </h3>
          
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Course:</span> {currentSession.course}</div>
            <div><span className="font-medium">Teacher:</span> {currentSession.teacher}</div>
            <div><span className="font-medium">Room:</span> {currentSession.room}</div>
            <div>
              <span className="font-medium">Enrolled Students:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {currentSession.enrolledStudents.map(student => (
                  <span key={student} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {student}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance Log */}
          {currentSession.attendanceLog.length > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Attendance Log
              </h4>
              <div className="space-y-1">
                {currentSession.attendanceLog.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{entry.student}</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {entry.status} ({entry.timestamp})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-600 mb-2 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Current Session
          </h3>
          <p className="text-sm text-gray-500">No active session</p>
        </div>
      )}

      {/* System Features */}
      <div className="p-3 bg-green-50 rounded-lg">
        <h4 className="text-sm font-semibold text-green-700 mb-2">System Capabilities</h4>
        <ul className="text-xs text-green-600 space-y-1">
          <li>• Teacher Schedule Management</li>
          <li>• Student Enrollment Verification</li>
          <li>• Real-time Attendance Tracking</li>
          <li>• Access Control Integration</li>
          <li>• Session State Management</li>
        </ul>
      </div>
    </div>
  );
};