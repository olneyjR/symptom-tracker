import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { DayCell } from './DayCell';
import { SymptomModal } from './SymptomModal';
import { SymptomEntry } from '../../types';
import { 
  getCalendarDays, 
  formatDate, 
  getNextMonth, 
  getPreviousMonth,
  isSameDayHelper 
} from '../../utils/dateHelpers';

interface CalendarViewProps {
  entries: SymptomEntry[];
  onSaveEntry: (entry: SymptomEntry) => void;
  onDeleteEntry: (date: string) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarView({ entries, onSaveEntry, onDeleteEntry }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendarDays = getCalendarDays(currentMonth);

  const getEntryForDate = (date: Date): SymptomEntry | null => {
    const dateStr = formatDate(date);
    return entries.find(e => e.date === dateStr) || null;
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(formatDate(date));
  };

  const handleSaveEntry = (entry: SymptomEntry) => {
    onSaveEntry(entry);
    setSelectedDate(null);
  };

  const handleDeleteEntry = () => {
    if (selectedDate) {
      onDeleteEntry(selectedDate);
      setSelectedDate(null);
    }
  };

  const selectedEntry = selectedDate 
    ? entries.find(e => e.date === selectedDate) || null 
    : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentMonth(getPreviousMonth(currentMonth))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentMonth(getNextMonth(currentMonth))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end space-x-4 mb-4 text-xs text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Mild</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span>Moderate</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Severe</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-700 py-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((date, index) => (
          <DayCell
            key={index}
            date={date}
            currentMonth={currentMonth}
            entry={getEntryForDate(date)}
            onClick={() => handleDayClick(date)}
          />
        ))}
      </div>

      {/* Info text */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Click any date to log symptoms. Logged days show a colored indicator based on severity.</p>
      </div>

      {/* Modal */}
      {selectedDate && (
        <SymptomModal
          date={selectedDate}
          existingEntry={selectedEntry}
          onSave={handleSaveEntry}
          onDelete={selectedEntry ? handleDeleteEntry : undefined}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
