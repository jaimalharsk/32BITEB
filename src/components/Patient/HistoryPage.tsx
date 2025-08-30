import React from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format, subDays } from 'date-fns';

const HistoryPage: React.FC = () => {
  // Mock data for demo
  const historyData = Array.from({ length: 14 }, (_, i) => {
    const date = subDays(new Date(), i);
    const totalSeconds = Math.floor(Math.random() * 25200) + 14400; // 4-11 hours
    const compliancePercent = Math.round((totalSeconds / 72000) * 100); // 20 hours = 72000 seconds
    
    return {
      date: format(date, 'yyyy-MM-dd'),
      displayDate: format(date, 'MMM dd'),
      dayOfWeek: format(date, 'EEE'),
      totalSeconds,
      compliancePercent,
      compliant: compliancePercent >= 85,
      sessions: Math.floor(Math.random() * 4) + 2, // 2-5 sessions
      verified: Math.random() > 0.2, // 80% verification rate
    };
  });

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Wear History</h1>
        <p className="text-gray-600">Track your daily compliance progress</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {Math.round(historyData.reduce((sum, day) => sum + day.compliancePercent, 0) / historyData.length)}%
            </div>
            <div className="text-sm text-gray-600">14-Day Average</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {historyData.filter(day => day.compliant).length}
            </div>
            <div className="text-sm text-gray-600">Compliant Days</div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {historyData.map((day, index) => (
          <div key={day.date} className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{day.dayOfWeek}</div>
                  <div className="text-xs text-gray-600">{day.displayDate}</div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    {day.compliant ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`font-semibold ${day.compliant ? 'text-green-600' : 'text-red-600'}`}>
                      {day.compliancePercent}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatTime(day.totalSeconds)} worn
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>{day.sessions} sessions</span>
                </div>
                {day.verified && (
                  <div className="text-xs text-green-600 mt-1">✓ Verified</div>
                )}
                {index === 0 && (
                  <div className="text-xs text-blue-600 mt-1">Today</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
