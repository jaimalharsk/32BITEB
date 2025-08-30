import React from 'react';
import DentistLayout from '../components/Layout/DentistLayout';
import { Users, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { faker } from '@faker-js/faker';

const DentistDashboard: React.FC = () => {
  // Mock data for demo
  const stats = [
    {
      name: 'Active Patients',
      value: '48',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      name: 'Avg Compliance',
      value: '87%',
      change: '+3%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
    {
      name: 'Pending Alerts',
      value: '6',
      change: '-2',
      changeType: 'negative' as const,
      icon: AlertTriangle,
    },
    {
      name: 'Due Check-ins',
      value: '12',
      change: '+4',
      changeType: 'neutral' as const,
      icon: Calendar,
    },
  ];

  const recentAlerts = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    patient: faker.person.fullName(),
    type: faker.helpers.arrayElement(['Low compliance', 'Missed change day', 'No verification']),
    time: faker.date.recent().toLocaleTimeString(),
    severity: faker.helpers.arrayElement(['high', 'medium', 'low']),
  }));

  const recentPatients = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    name: faker.person.fullName(),
    tray: faker.number.int({ min: 1, max: 24 }),
    compliance: faker.number.int({ min: 65, max: 98 }),
    lastSeen: faker.date.recent().toLocaleDateString(),
  }));

  return (
    <DentistLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your patients\' aligner compliance and treatment progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last week</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View all
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.severity === 'high' ? 'bg-red-500' :
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{alert.patient}</p>
                        <p className="text-sm text-gray-600">{alert.type}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient List Preview */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Patients</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View all
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentPatients.slice(0, 6).map((patient) => (
                <div key={patient.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">Tray {patient.tray} • Last seen {patient.lastSeen}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.compliance >= 90 ? 'bg-green-100 text-green-800' :
                        patient.compliance >= 80 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {patient.compliance}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DentistLayout>
  );
};

export default DentistDashboard;
