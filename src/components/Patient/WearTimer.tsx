import React, { useState, useEffect } from 'react';
import { Play, Pause, Camera, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WearTimerProps {
  prescribedHours: number;
  todayWornSeconds: number;
  isActive: boolean;
  onStartTimer: () => void;
  onStopTimer: () => void;
  onSelfieCheck: () => void;
}

const WearTimer: React.FC<WearTimerProps> = ({
  prescribedHours,
  todayWornSeconds,
  isActive,
  onStartTimer,
  onStopTimer,
  onSelfieCheck
}) => {
  const [currentSessionSeconds, setCurrentSessionSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setCurrentSessionSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const totalSecondsToday = todayWornSeconds + currentSessionSeconds;
  const targetSeconds = prescribedHours * 3600;
  const progressPercent = Math.min((totalSecondsToday / targetSeconds) * 100, 100);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatSessionTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Progress Ring */}
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={283}
              strokeDashoffset={283 - (283 * progressPercent) / 100}
              strokeLinecap="round"
              className="text-primary-500"
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * progressPercent) / 100 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-900">
              {formatTime(totalSecondsToday)}
            </div>
            <div className="text-sm text-gray-500">
              of {prescribedHours}h goal
            </div>
            <div className="text-lg font-semibold text-primary-600 mt-1">
              {Math.round(progressPercent)}%
            </div>
          </div>
        </div>
      </div>

      {/* Current Session */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 rounded-xl p-4 text-center border border-primary-200"
        >
          <div className="text-sm text-primary-600 font-medium mb-1">Current Session</div>
          <div className="text-2xl font-mono font-bold text-primary-900">
            {formatSessionTime(currentSessionSeconds)}
          </div>
        </motion.div>
      )}

      {/* Timer Controls */}
      <div className="space-y-4">
        <motion.button
          onClick={isActive ? onStopTimer : onStartTimer}
          className={`w-full h-16 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 transition-all ${
            isActive
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
              : 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          {isActive ? (
            <>
              <Pause className="h-6 w-6" />
              <span>Stop & Verify</span>
            </>
          ) : (
            <>
              <Play className="h-6 w-6" />
              <span>Start Wear Timer</span>
            </>
          )}
        </motion.button>

        <motion.button
          onClick={onSelfieCheck}
          className="w-full h-14 bg-white border-2 border-primary-300 text-primary-700 hover:bg-primary-50 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all"
          whileTap={{ scale: 0.98 }}
        >
          <Camera className="h-5 w-5" />
          <span>Quick Selfie — Confirm Aligner</span>
        </motion.button>
      </div>

      {/* Compliance Status */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {progressPercent >= 85 ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
            )}
            <span className="font-medium text-gray-900">Today\'s Goal</span>
          </div>
          <span className={`font-semibold ${progressPercent >= 85 ? 'text-green-600' : 'text-gray-600'}`}>
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {progressPercent >= 85 
            ? 'Great job! You\'re on track with your treatment.' 
            : `${formatTime(targetSeconds - totalSecondsToday)} remaining to reach your goal.`
          }
        </div>
      </div>
    </div>
  );
};

export default WearTimer;
