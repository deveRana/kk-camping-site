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
        <label className="block text-xs font-semibold text-terracotta-deep uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}

      {/* Input Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-cream/40 border border-cream-dark rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-terracotta-deep flex items-center justify-between hover:bg-cream-dark/40 focus:outline-none focus:ring-2 focus:ring-terracotta transition shadow-sm"
      >
        <span className={value ? 'font-semibold text-terracotta-deep' : 'text-gray-400'}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <svg
          className="w-5 h-5 text-terracotta flex-shrink-0"
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

      {/* Custom Calendar Popover Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-72 bg-white border border-cream-dark rounded-2xl shadow-2xl p-4 animate-scaleUp">
          {/* Calendar Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-cream-dark">
            <button
              onClick={handlePrevMonth}
              className="p-1 text-terracotta-deep hover:bg-cream-dark/50 rounded-lg transition"
              aria-label="Previous Month"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-display font-bold text-terracotta-deep text-sm">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1 text-terracotta-deep hover:bg-cream-dark/50 rounded-lg transition"
              aria-label="Next Month"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Weekday Names */}
          <div className="grid grid-cols-7 text-center mb-1">
            {WEEKDAYS.map((wd) => (
              <span key={wd} className="text-[11px] font-bold text-terracotta-deep/60 py-1">
                {wd}
              </span>
            ))}
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
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
                  className={`h-8 rounded-xl text-xs font-semibold flex items-center justify-center transition ${
                    selected
                      ? 'bg-terracotta text-white shadow-md'
                      : today
                      ? 'bg-amber-warm/20 text-terracotta font-bold border border-amber-warm'
                      : 'text-terracotta-deep hover:bg-cream-dark/60'
                  } ${disabled ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : ''}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
