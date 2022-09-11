import { LoggerLevel } from './../types/logger-level.enum';
import { INGXLoggerConfig } from './iconfig';

export interface INGXLoggerConfigEngine {

  /** Get a readonly access to the level configured for the NGXLogger */
  readonly level: LoggerLevel;

  /** Get a readonly access to the serverLogLevel configured for the NGXLogger */
  readonly serverLogLevel: LoggerLevel;

  /** Update the config */
  updateConfig(config: INGXLoggerConfig): void;

  /** Gets the confing */
  getConfig(): INGXLoggerConfig;
}
