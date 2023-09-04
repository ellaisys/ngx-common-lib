import { Injectable } from '@angular/core';
import { LoggerLevel } from '../types/logger-level.enum';
import { INGXLoggerConfig } from '../config/iconfig';
import { INGXLoggerRulesService } from './irules.service';

@Injectable()
export class NGXLoggerRulesService implements INGXLoggerRulesService {

  public shouldCallWriter(level: LoggerLevel, config: INGXLoggerConfig, message?: any, additional?: any[]): boolean {
    return !config.disableConsoleLogging && level >= config.level;
  }

  public shouldCallServer(level: LoggerLevel, config: INGXLoggerConfig, message?: any, additional?: any[]): boolean {
    return !!config.serverLoggingUrl && level >= config.serverLogLevel;
  }

  public shouldCallMonitor(level: LoggerLevel, config: INGXLoggerConfig, message?: any, additional?: any[]): boolean {
    // The default behavior is to call the monitor only if the writer or the server is called
    return this.shouldCallWriter(level, config, message, additional) || this.shouldCallServer(level, config, message, additional);
  }
}
