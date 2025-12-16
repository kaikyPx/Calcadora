export enum CalcMode {
  STANDARD = 'STANDARD',
  SCIENTIFIC = 'SCIENTIFIC',
  AI_SOLVER = 'AI_SOLVER',
  PROGRAMMER = 'PROGRAMMER'
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  mode: CalcMode;
  timestamp: number;
}

export type ThemeColor = 'primary' | 'secondary' | 'accent' | 'danger' | 'success';

export interface CalculatorState {
  input: string;
  result: string;
  history: HistoryItem[];
  mode: CalcMode;
  isLoading: boolean;
  error: string | null;
}
