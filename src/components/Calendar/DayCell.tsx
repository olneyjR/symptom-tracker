import React from 'react';
import { format, isSameMonth } from 'date-fns';
import { SymptomEntry } from '../../types';
import { isDateToday, isDateFuture } from '../../utils/dateHelpers';
import clsx from 'clsx';

interface DayCellProps {
  date: Date;
  currentMonth: Date;
  entry: SymptomEntry | null;
  onClick: () => void;
}

export function DayCell({ date, currentMonth, entry, onClick }: DayCellProps) {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isToday = isDateToday(date);
  const isFuture = isDateFuture(date);
  const hasEntry = !!entry;

  const avgSeverity = entry 
    ? entry.symptoms.reduce((sum, s) => sum + s.severity, 0) / entry.symptoms.length 
    : 0;

  const getSeverityColor = (severity: number) => {
    if (severity >= 7) return 'bg-red-500';
    if (severity >= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <button
      onClick={onClick}
      disabled={isFuture}
      className={clsx(
        'aspect-square p-2 border border-gray-200 text-left transition-all relative',
        'hover:border-primary-300 hover:shadow-sm',
        {
          'bg-gray-50 text-gray-400': !isCurrentMonth,
          'bg-white': isCurrentMonth && !isFuture,
          'bg-gray-100 cursor-not-allowed': isFuture,
          'ring-2 ring-primary-500': isToday,
        }
      )}
    >
      <div className="flex flex-col h-full">
        <span className={clsx(
          'text-sm font-medium',
          {
            'text-gray-900': isCurrentMonth && !isFuture,
            'text-gray-400': !isCurrentMonth || isFuture,
            'text-primary-600 font-bold': isToday,
          }
        )}>
          {format(date, 'd')}
        </span>

        {hasEntry && (
          <div className="mt-auto">
            <div className={clsx(
              'w-2 h-2 rounded-full',
              getSeverityColor(avgSeverity)
            )} />
            <div className="text-xs text-gray-600 mt-1">
              {entry.symptoms.slice(0, 2).map((symptom, idx) => (
                <p key={idx} className="truncate leading-tight">
                  {symptom.name}
                </p>
              ))}
              {entry.symptoms.length > 2 && (
                <p className="truncate leading-tight text-gray-500">
                  +{entry.symptoms.length - 2} more
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </button>
  );
}