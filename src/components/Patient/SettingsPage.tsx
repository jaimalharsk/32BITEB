import React from 'react';
import { 
  Bell, 
  Phone, 
  Mail, 
  Shield, 
  HelpCircle, 
  ChevronRight,
  Globe,
  Moon,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();

  const settingsGroups = [
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Reminder Settings',
          description: 'Customize your wear reminders',
          action: () => console.log('Open reminder settings'),
        },
        {
          icon: Smartphone,
          label: 'Push Notifications',
          description: 'App notifications',
          toggle: true,
          value: true,
        },
      ],
    },
    {
      title: 'Communication',
      items: [
        {
          icon: Phone,
          label: 'Contact Clinic',
          description: 'Call Dr. Smith\'s office',
          action: () => console.log('Call clinic'),
        },
        {
          icon: Mail,
          label: 'Email Preferences',
          description: 'Manage email notifications',
          action: () => console.log('Email preferences'),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: Globe,
          label: 'Language',
          description: 'English',
          action: () => console.log('Language settings'),
        },
        {
          icon: Moon,
          label: 'Dark Mode',
          description: 'Toggle dark theme',
          toggle: true,
          value: false,
        },
        {
          icon: Shield,
          label: 'Privacy & Consent',
          description: 'Data usage preferences',
          action: () => console.log('Privacy settings'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & FAQ',
          description: 'Get help and support',
          action: () => console.log('Help'),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-600">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <div>Patient ID: {user?.patientId}</div>
              <div>Clinic: AlignClinic Demo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Groups */}
      {settingsGroups.map((group) => (
        <div key={group.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{group.title}</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {group.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </div>
                    
                    {item.toggle ? (
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.value ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    ) : (
                      <button
                        onClick={item.action}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-medium py-4 px-6 rounded-xl transition-colors border border-red-200"
      >
        Sign Out
      </button>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500">
        <div>AlignClinic v1.0.0</div>
        <div>© 2025 AlignClinic. All rights reserved.</div>
      </div>
    </div>
  );
};

export default SettingsPage;
