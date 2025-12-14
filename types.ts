export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface DailyEntry {
  date: string; // Format: YYYY-MM-DD
  question: string;
  answer: string;
  timestamp: number;
}

export type AppState = 'auth' | 'main';
