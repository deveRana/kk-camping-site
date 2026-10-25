'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface DatePickerProps {
  label?: string;
  value: string; // ISO format YYYY-MM-DD or empty
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: string; // YYYY-MM-DD
  className?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Select Date',
  minDate,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const parsedDate = value ? new Date(value) : null;
  const initialViewDate = parsedDate || new Date();

  const [currentYear, setCurrentYear] = useState(initialViewDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialViewDate.getMonth());

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when picker is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleSelectDay = (day: number) => {
    const monthStr = String(currentMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateFormatted = `${currentYear}-${monthStr}-${dayStr}`;
    onChange(dateFormatted);
    setIsOpen(false);
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const d = new Date(value);
    return (
      d.getFullYear() === currentYear &&
      d.getMonth() === currentMonth &&
      d.getDate() === day
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      today.getDate() === day
    );
  };

  const isDisabled = (day: number) => {
    if (!minDate) return false;
    const minD = new Date(minDate);
    const thisD = new Date(currentYear, currentMonth, day);
    return thisD < new Date(minD.getFullYear(), minD.getMonth(), minD.getDate());
  };

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-40' : 'z-10'} ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-forest-deep uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}

      {/* Input Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-paper/40 border border-mist rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-forest-deep flex items-center justify-between hover:bg-mist/40 focus:outline-none focus:ring-2 focus:ring-forest transition shadow-sm"
      >
        <span className={value ? 'font-semibold text-forest-deep' : 'text-gray-400'}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <svg
          className="w-5 h-5 text-forest flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {/* Calendar Modal - Bottom Sheet Style on Mobile */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Calendar Container - Bottom Sheet on Mobile, Dropdown on Desktop */}
          <div className="fixed bottom-0 left-0 right-0 z-50 sm:absolute sm:bottom-auto sm:top-full sm:left-0 sm:right-auto sm:mt-2">
            <div className="w-full sm:w-80 bg-white sm:border border-mist sm:rounded-2xl rounded-t-3xl sm:rounded-t-2xl shadow-2xl animate-slideUp sm:animate-scaleUp">
              {/* Drag Handle (Mobile Only) */}
              <div className="sm:hidden flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>

              {/* Scrollable Calendar Content */}
              <div className="max-h-[80vh] overflow-y-auto overscroll-contain">
                <div className="p-4 pb-safe">
                  {/* Calendar Header - Sticky */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-mist sticky top-0 bg-white z-10">
                    <button
                      onClick={handlePrevMonth}
                      type="button"
                      className="p-2 text-forest-deep hover:bg-mist/50 rounded-lg transition touch-manipulation"
                      aria-label="Previous Month"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="font-display font-semibold text-forest-deep text-base">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </span>
                    <button
                      onClick={handleNextMonth}
                      type="button"
                      className="p-2 text-forest-deep hover:bg-mist/50 rounded-lg transition touch-manipulation"
                      aria-label="Next Month"
                    >
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Weekday Names */}
                  <div className="grid grid-cols-7 text-center mb-2">
                    {WEEKDAYS.map((wd) => (
                      <span key={wd} className="text-xs font-bold text-forest-deep/60 py-2">
                        {wd}
                      </span>
                    ))}
                  </div>

                  {/* Day Grid - All dates visible */}
                  <div className="grid grid-cols-7 gap-2 text-center pb-4">
                    {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                      <div key={`empty-${idx}`} />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const day = idx + 1;
                      const selected = isSelected(day);
                      const today = isToday(day);
                      const disabled = isDisabled(day);

                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={disabled}
                          onClick={() => handleSelectDay(day)}
                          className={`h-11 rounded-xl text-sm font-semibold flex items-center justify-center transition-all touch-manipulation ${
                            selected
                              ? 'bg-forest text-white shadow-lg scale-105'
                              : today
                              ? 'bg-sage/20 text-forest font-bold border-2 border-sage'
                              : 'text-forest-deep hover:bg-mist/60 active:bg-mist'
                          } ${disabled ? 'opacity-30 cursor-not-allowed hover:bg-transparent line-through' : ''}`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="w-full mt-4 mb-2 py-3.5 bg-forest text-white font-semibold rounded-xl hover:bg-forest/90 transition touch-manipulation shadow-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
