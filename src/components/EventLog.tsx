import React, { useEffect, useRef } from 'react';
import { Clock, Zap, Server, Database, DoorOpen } from 'lucide-react';
import { EventLogEntry } from '../App';

interface EventLogProps {
  entries: EventLogEntry[];
}

export const EventLog: React.FC<EventLogProps> = ({ entries }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  const getIcon = (type: EventLogEntry['type']) => {
    switch (type) {
      case 'device':
        return <Zap className="w-4 h-4 text-blue-500" />;
      case 'middleware':
        return <Server className="w-4 h-4 text-yellow-500" />;
      case 'app':
        return <Database className="w-4 h-4 text-green-500" />;
      case 'door':
        return <DoorOpen className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: EventLogEntry['type']) => {
    switch (type) {
      case 'device':
        return 'border-l-blue-500 bg-blue-50';
      case 'middleware':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'app':
        return 'border-l-green-500 bg-green-50';
      case 'door':
        return 'border-l-purple-500 bg-purple-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Real-time Event Log
        </h2>
        <p className="text-sm text-gray-600">System activity and data flow tracking</p>
      </div>
      
      <div className="h-64 overflow-y-auto p-4">
        {entries.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Waiting for system activity...</p>
          </div>
        ) : (
          <div className="space-y-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className={`p-3 rounded-lg border-l-4 ${getTypeColor(entry.type)} transition-all duration-200`}
              >
                <div className="flex items-start gap-3">
                  {getIcon(entry.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {entry.type}
                      </span>
                      <span className="text-xs text-gray-400">
                        {entry.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {entry.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};