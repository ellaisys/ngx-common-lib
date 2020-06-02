import { LoggerLevel } from './logger-level.enum';

export class LogInterface {
  level: LoggerLevel;
  timestamp: string;
  fileName: string;
  lineNumber: string;
  message: string;
  additional: any[];
}
