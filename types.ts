export interface Career {
  id: string;
  title: string;
  description: string;
  salary: number;
  growth: number; // Percentage
  degreeLevel: string;
  classroomActivity: string; // How to link it in class
  skills: string[];
}

export interface InfographicData {
  topic: string;
  summary: string;
  careers: Career[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}