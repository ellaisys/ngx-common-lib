import {LoggerLevel} from './types/logger-level.enum';

export class LoggerConfig {
  level: LoggerLevel;
  serverLogLevel?: LoggerLevel;
  serverLoggingUrl?: string;
  disableConsoleLogging?: boolean;
  httpResponseType?: 'arraybuffer' | 'blob' | 'text' | 'json';
  enableSourceMaps?: boolean;
}
