import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientLayout from '../components/Layout/PatientLayout';
import WearTimer from '../components/Patient/WearTimer';
import TrayProgress from '../components/Patient/TrayProgress';
import HistoryPage from '../components/Patient/HistoryPage';
import MessagesPage from '../components/Patient/MessagesPage';
import SettingsPage from '../components/Patient/SettingsPage';
import { Bell, AlertCircle } from 'lucide-react';

const PatientHome: React.FC = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [todayWornSeconds] = useState(18000); // 5 hours mock data

  const handleStartTimer = () => {
    setIsTimerActive(true);
  };

  const handleStopTimer = () => {
    setIsTimerActive(false);
    // Here you would normally save the session
  };

  const handleSelfieCheck = () => {
    // Mock selfie verification
    alert('Camera would open for selfie verification');
  };

  return (
    <div className="space-y-6">
      {/* Quick Alerts */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Bell className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <div className="font-medium text-amber-900">Reminder</div>
            <div className="text-sm text-amber-700">
              Don\'t forget to wear your aligners for 20 hours today!
            </div>
          </div>
        </div>
      </div>

      {/* Wear Timer */}
      <WearTimer
        prescribedHours={20}
        todayWornSeconds={todayWornSeconds}
        isActive={isTimerActive}
        onStartTimer={handleStartTimer}
        onStopTimer={handleStopTimer}
        onSelfieCheck={handleSelfieCheck}
      />

      {/* Tray Progress */}
      <TrayProgress
        currentTray={12}
        totalTrays={24}
        startDate={new Date('2024-01-15')}
      />

      {/* Today\'s Tips */}
      <div className="bg-primary-50 rounded-xl p-4 border border-primary-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-primary-600 mt-0.5" />
          <div>
            <div className="font-medium text-primary-900">Today\'s Tip</div>
            <div className="text-sm text-primary-700">
              Take your aligners out only for eating and brushing. Remember to store them in your case!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientDashboard: React.FC = () => {
  return (
    <PatientLayout>
      <Routes>
        <Route path="/" element={<PatientHome />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </PatientLayout>
  );
};

export default PatientDashboard;
