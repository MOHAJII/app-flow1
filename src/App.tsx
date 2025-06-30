import React, { useState, useCallback } from 'react';
import { DevicePanel } from './components/DevicePanel';
import { MiddlewarePanel } from './components/MiddlewarePanel';
import { SchoolAppPanel } from './components/SchoolAppPanel';
import { EventLog } from './components/EventLog';
import { DoorComponent } from './components/DoorComponent';

export interface EventLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'device' | 'middleware' | 'app' | 'door';
}

export interface SessionData {
  course?: string;
  teacher?: string;
  room?: string;
  enrolledStudents: string[];
  attendanceLog: Array<{
    student: string;
    timestamp: string;
    status: 'Present';
  }>;
}

export interface AppState {
  deviceStatus: string;
  isDoorOpen: boolean;
  middlewareStatus: string;
  appStatus: string;
  currentSession: SessionData | null;
  eventLog: EventLogEntry[];
  activeProtocol: 'none' | 'tcp' | 'http';
  currentUser: string;
  userType: 'security' | 'teacher' | 'student' | null;
}

function App() {
  const [state, setState] = useState<AppState>({
    deviceStatus: 'Ready to Scan',
    isDoorOpen: false,
    middlewareStatus: 'Waiting for Connection',
    appStatus: 'Ready',
    currentSession: null,
    eventLog: [],
    activeProtocol: 'none',
    currentUser: '',
    userType: null,
  });

  const addLogEntry = useCallback((message: string, type: EventLogEntry['type']) => {
    const entry: EventLogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    
    setState(prev => ({
      ...prev,
      eventLog: [...prev.eventLog, entry],
    }));
  }, []);

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const simulateUserScan = async (userType: 'security' | 'teacher' | 'student', userName: string) => {
    // Reset state
    updateState({ 
      deviceStatus: 'Identifying User...', 
      activeProtocol: 'none',
      currentUser: userName,
      userType: userType,
    });
    
    addLogEntry(`User scan initiated for ${userName}`, 'device');
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // User identified
    updateState({ deviceStatus: `User Identified: ${userName}` });
    addLogEntry(`Device: User '${userName}' identified`, 'device');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Send TCP to middleware
    updateState({ 
      activeProtocol: 'tcp',
      middlewareStatus: 'Processing TCP Data...'
    });
    addLogEntry('Device: Sending TCP identification record to middleware', 'device');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Middleware processing
    updateState({ middlewareStatus: 'Converting to HTTP Request...' });
    addLogEntry('Middleware: TCP received, converting to HTTP', 'middleware');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Send HTTP to custom app
    updateState({ 
      activeProtocol: 'http',
      middlewareStatus: 'HTTP Request Sent',
    });
    addLogEntry('Middleware: HTTP POST request sent to custom application', 'middleware');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Custom app processing based on user type
    if (userType === 'security') {
      await handleSecurityAgent(userName);
    } else if (userType === 'teacher') {
      await handleTeacher(userName);
    } else if (userType === 'student') {
      await handleStudent(userName);
    }
  };

  const handleSecurityAgent = async (userName: string) => {
    updateState({ appStatus: 'User is Security Agent. Opening door.' });
    addLogEntry('Custom App: Security agent identified, sending door open command', 'app');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    await sendDoorCommand();
    addLogEntry(`Security Agent ${userName} entered`, 'app');
  };

  const handleTeacher = async (userName: string) => {
    updateState({ appStatus: `User is Teacher. Checking schedule for ${userName}...` });
    addLogEntry(`Custom App: Checking schedule for teacher ${userName}`, 'app');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const sessionData: SessionData = {
      course: 'Biology 101',
      teacher: userName,
      room: 'Room 301',
      enrolledStudents: ['MOHAMMED', 'SARA', 'AHMED'],
      attendanceLog: [],
    };
    
    updateState({ 
      appStatus: 'Class Scheduled: Biology 101 - Room 301. Starting New Session...',
      currentSession: sessionData,
    });
    addLogEntry(`Custom App: Class session started - ${sessionData.course} in ${sessionData.room}`, 'app');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    await sendDoorCommand();
    addLogEntry(`Teacher ${userName} started ${sessionData.course} session in ${sessionData.room}`, 'app');
  };

  const handleStudent = async (userName: string) => {
    updateState({ appStatus: 'User is Student. Checking for active session...' });
    addLogEntry('Custom App: Checking for active session', 'app');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (!state.currentSession) {
      updateState({ appStatus: 'No active session found. Access denied.' });
      addLogEntry(`Student ${userName} - No active session, access denied`, 'app');
      resetToReady();
      return;
    }
    
    updateState({ appStatus: `Active session (${state.currentSession.course}) found. Verifying ${userName}'s enrollment...` });
    addLogEntry(`Custom App: Verifying ${userName}'s enrollment in ${state.currentSession.course}`, 'app');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!state.currentSession.enrolledStudents.includes(userName)) {
      updateState({ appStatus: `Student ${userName} not enrolled. Access denied.` });
      addLogEntry(`Student ${userName} not enrolled in current session, access denied`, 'app');
      resetToReady();
      return;
    }
    
    // Add to attendance
    const attendanceEntry = {
      student: userName,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Present' as const,
    };
    
    const updatedSession = {
      ...state.currentSession,
      attendanceLog: [...state.currentSession.attendanceLog, attendanceEntry],
    };
    
    updateState({ 
      appStatus: `Student ${userName} is enrolled. Marking present.`,
      currentSession: updatedSession,
    });
    addLogEntry(`Custom App: Student ${userName} marked present for ${state.currentSession.course}`, 'app');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    await sendDoorCommand();
    addLogEntry(`Student ${userName} marked present for ${state.currentSession.course}`, 'app');
  };

  const sendDoorCommand = async () => {
    updateState({ 
      activeProtocol: 'http',
      middlewareStatus: 'Receiving Door Command...',
    });
    addLogEntry('Custom App: Sending door open command to middleware', 'app');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateState({ 
      activeProtocol: 'tcp',
      middlewareStatus: 'Converting HTTP to TCP...',
    });
    addLogEntry('Middleware: Converting HTTP command to TCP', 'middleware');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateState({ 
      middlewareStatus: 'TCP Command Sent',
      isDoorOpen: true,
    });
    addLogEntry('Middleware: TCP door command sent to device', 'middleware');
    addLogEntry('Door: Opened', 'door');
    
    // Close door after delay
    setTimeout(() => {
      updateState({ isDoorOpen: false });
      addLogEntry('Door: Closed', 'door');
      resetToReady();
    }, 3000);
  };

  const resetToReady = () => {
    setTimeout(() => {
      updateState({
        deviceStatus: 'Ready to Scan',
        middlewareStatus: 'Waiting for Connection',
        appStatus: 'Ready',
        activeProtocol: 'none',
        currentUser: '',
        userType: null,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            HeyStar Attendance Tracking System
          </h1>
          <p className="text-lg text-gray-600">
            Interactive Visualization of Palm Vein Access Control & School Management Integration
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Panel - Device */}
          <div className="relative">
            <DevicePanel 
              status={state.deviceStatus}
              onUserScan={simulateUserScan}
              currentUser={state.currentUser}
              userType={state.userType}
            />
            <DoorComponent isOpen={state.isDoorOpen} />
          </div>

          {/* Middle Panel - Middleware */}
          <MiddlewarePanel 
            status={state.middlewareStatus}
            activeProtocol={state.activeProtocol}
          />

          {/* Right Panel - School App */}
          <SchoolAppPanel 
            status={state.appStatus}
            currentSession={state.currentSession}
          />
        </div>

        {/* Event Log */}
        <EventLog entries={state.eventLog} />
      </div>
    </div>
  );
}

export default App;