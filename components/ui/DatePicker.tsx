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

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

    const handleScroll = () => {
      if (isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const dropdownHeight = 450;

        if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
          setDropdownStyle({
            position: 'fixed',
            top: `${rect.top - dropdownHeight - 8}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            zIndex: 9999,
          });
        } else {
          setDropdownStyle({
            position: 'fixed',
            top: `${rect.bottom + 8}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            zIndex: 9999,
          });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true); // Capture phase to catch all scrolls
    window.addEventListener('resize', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
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

  // Calculate dropdown position when opened
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 450; // Approximate height

      // Position dropdown: if not enough space below, show above
      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        setDropdownStyle({
          position: 'fixed',
          top: `${rect.top - dropdownHeight - 8}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          zIndex: 9999,
        });
      } else {
        setDropdownStyle({
          position: 'fixed',
          top: `${rect.bottom + 8}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          zIndex: 9999,
        });
      }
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
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

      {/* Calendar Dropdown - Fixed positioning to escape overflow containers */}
      {isOpen && (
        <div
          style={dropdownStyle}
          className="bg-white border-2 border-forest/20 rounded-xl shadow-2xl"
        >
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-3 border-b-2 border-mist bg-white rounded-t-xl">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-mist rounded-lg transition"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-semibold text-forest-deep">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-mist rounded-lg transition"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Scrollable Calendar Body */}
          <div
            className="p-3 bg-white"
            style={{
              maxHeight: '320px',
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
            }}
          >
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {WEEKDAYS.map((wd) => (
                <div key={wd} className="text-xs font-bold text-center text-forest-deep/60 py-1">
                  {wd}
                </div>
              ))}
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for alignment */}
              {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} />
              ))}

              {/* Date buttons */}
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
                    className={`
                      h-9 rounded-lg text-sm font-semibold
                      flex items-center justify-center
                      transition-all
                      ${selected
                        ? 'bg-forest text-white shadow-md scale-105'
                        : today
                        ? 'bg-sage/30 text-forest border-2 border-sage'
                        : 'text-forest-deep hover:bg-mist'
                      }
                      ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Extra padding at bottom for smooth scrolling */}
            <div className="h-4"></div>
          </div>

          {/* Close button */}
          <div className="p-3 border-t-2 border-mist bg-white rounded-b-xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-forest text-white font-semibold rounded-lg hover:bg-forest/90 transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
