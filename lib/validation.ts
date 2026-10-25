/**
 * Input validation and sanitization utilities
 * Protects against XSS, injection, and invalid data
 */

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export function validatePhone(phone: string): boolean {
  // Validates Indian phone numbers: +91XXXXXXXXXX or 10 digits
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

export function sanitizeString(input: string, maxLength: number = 500): string {
  // Remove potentially dangerous characters
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove < and > to prevent HTML injection
}

export function validateNumber(value: number, min: number, max: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
}

export function validateReferenceId(refId: string): boolean {
  // Format: LS-2026-XXXX
  const refIdRegex = /^LS-\d{4}-\d{4}$/;
  return refIdRegex.test(refId);
}

export function validateDate(dateString: string): boolean {
  // Validates YYYY-MM-DD format and checks if it's a valid date
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function validateDateNotPast(dateString: string): boolean {
  // Check if date is today or in the future
  if (!validateDate(dateString)) return false;

  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to compare only dates

  return date >= today;
}

export function validateCheckInCheckOut(checkIn: string, checkOut: string): boolean {
  // Validates that check-out is after check-in
  if (!validateDate(checkIn) || !validateDate(checkOut)) return false;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  return checkOutDate > checkInDate;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateBookingData(data: any): ValidationResult {
  const errors: string[] = [];

  // Validate reference ID
  if (!data.referenceId || !validateReferenceId(data.referenceId)) {
    errors.push('Invalid reference ID format');
  }

  // Validate guest email
  if (!data.guestEmail || !validateEmail(data.guestEmail)) {
    errors.push('Invalid email address');
  }

  // Validate guest phone
  if (!data.guestPhone || !validatePhone(data.guestPhone)) {
    errors.push('Invalid phone number (must be valid Indian number)');
  }

  // Validate guest name
  if (!data.guestName || data.guestName.trim().length < 2) {
    errors.push('Guest name must be at least 2 characters');
  }
  if (data.guestName && data.guestName.length > 100) {
    errors.push('Guest name is too long (max 100 characters)');
  }

  // Validate number of guests
  if (!validateNumber(data.numberOfGuests, 1, 50)) {
    errors.push('Number of guests must be between 1 and 50');
  }

  // Validate prices
  if (!validateNumber(data.totalAmount, 0, 1000000)) {
    errors.push('Invalid total amount');
  }
  if (!validateNumber(data.basePrice, 0, 1000000)) {
    errors.push('Invalid base price');
  }

  // Validate payment method
  const validPaymentMethods = ['upi', 'card', 'netbanking', 'cash', 'razorpay'];
  if (!validPaymentMethods.includes(data.paymentMethod)) {
    errors.push('Invalid payment method');
  }

  // Validate check-in date (if provided)
  if (data.checkInDate) {
    if (!validateDate(data.checkInDate)) {
      errors.push('Invalid check-in date format (use YYYY-MM-DD)');
    } else if (!validateDateNotPast(data.checkInDate)) {
      errors.push('Check-in date cannot be in the past');
    }
  }

  // Validate check-out date (if provided)
  if (data.checkOutDate) {
    if (!validateDate(data.checkOutDate)) {
      errors.push('Invalid check-out date format (use YYYY-MM-DD)');
    } else if (!validateDateNotPast(data.checkOutDate)) {
      errors.push('Check-out date cannot be in the past');
    }
  }

  // Validate check-in and check-out relationship
  if (data.checkInDate && data.checkOutDate) {
    if (!validateCheckInCheckOut(data.checkInDate, data.checkOutDate)) {
      errors.push('Check-out date must be after check-in date');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize booking data to prevent injection attacks
 */
export function sanitizeBookingData(data: any) {
  return {
    ...data,
    guestName: sanitizeString(data.guestName, 100),
    guestCity: data.guestCity ? sanitizeString(data.guestCity, 50) : undefined,
    propertyName: sanitizeString(data.propertyName, 200),
    notes: data.notes ? sanitizeString(data.notes, 1000) : undefined,
    couponCode: data.couponCode ? sanitizeString(data.couponCode, 20).toUpperCase() : undefined,
  };
}
