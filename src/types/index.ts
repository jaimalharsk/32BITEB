export interface Clinic {
  id: string;
  name: string;
  logoUrl?: string;
  primaryColor: string;
  contactEmail: string;
  phone: string;
  timezone: string;
  createdAt: Date;
}

export interface Patient {
  id: string;
  clinicId: string;
  name: string;
  email: string;
  phone: string;
  dob: Date;
  trayStartDate: Date;
  totalTrays: number;
  currentTrayNumber: number;
  prescribedHoursPerDay: number;
  timezone: string;
  onboardingComplete: boolean;
  createdAt: Date;
}

export interface WearSession {
  id: string;
  patientId: string;
  startTimestamp: Date;
  endTimestamp?: Date;
  durationSeconds: number;
  verified: boolean;
  verificationImageUrl?: string;
  verificationConfidence: number;
  createdAt: Date;
}

export interface DailySummary {
  id: string;
  patientId: string;
  date: string; // YYYY-MM-DD
  totalSecondsWorn: number;
  compliancePercent: number;
  compliant: boolean;
  notes?: string;
}

export interface Alert {
  id: string;
  clinicId: string;
  patientId: string;
  type: 'missed_target' | 'low_streak' | 'skipped_change_day';
  message: string;
  acknowledged: boolean;
  createdAt: Date;
}

export type UserRole = 'patient' | 'dentist' | 'staff' | 'auditor';

export interface AppUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  clinicId?: string;
  patientId?: string;
}
