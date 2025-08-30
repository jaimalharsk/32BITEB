import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface TrayProgressProps {
  currentTray: number;
  totalTrays: number;
  startDate: Date;
  changeDay?: Date;
}

const TrayProgress: React.FC<TrayProgressProps> = ({
  currentTray,
  totalTrays,
  startDate,
  changeDay
}) => {
  const progressPercent = (currentTray / totalTrays) * 100;
  const nextChangeDay = changeDay || addDays(new Date(), 7);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Treatment Progress</h3>
        <span className="text-sm text-gray-500">
          Tray {currentTray} of {totalTrays}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Next Change Day */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-blue-600" />
          <div>
            <div className="font-medium text-blue-900">Next Tray Change</div>
            <div className="text-sm text-blue-700">
              {format(nextChangeDay, 'EEEE, MMMM do')} — Tray #{currentTray + 1}
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-blue-600 ml-auto" />
        </div>
      </div>

      {/* Treatment Timeline */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Started:</span>
            <span>{format(startDate, 'MMM do, yyyy')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Estimated completion:</span>
            <span>{format(addDays(startDate, totalTrays * 14), 'MMM do, yyyy')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrayProgress;
