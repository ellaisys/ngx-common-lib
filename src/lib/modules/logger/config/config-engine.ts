import { LoggerLevel } from './../types/logger-level.enum';
import { INGXLoggerConfigEngine } from './iconfig-engine';
import { INGXLoggerConfig } from './iconfig';

export class NGXLoggerConfigEngine implements INGXLoggerConfigEngine {

  private config: INGXLoggerConfig;

  constructor(
    config: INGXLoggerConfig,
  ) {
    this.config = this._clone(config);
  }

  /** Get a readonly access to the level configured for the NGXLogger */
  get level(): LoggerLevel | any {
    return this.config.level;
  }

  /** Get a readonly access to the serverLogLevel configured for the NGXLogger */
  get serverLogLevel(): LoggerLevel | any {
    return this.config.serverLogLevel;
  }

  updateConfig(config: INGXLoggerConfig) {
    this.config = this._clone(config);
  }

  getConfig(): INGXLoggerConfig {
    return this._clone(this.config);
  }

  // TODO: This is a shallow clone, If the config ever becomes hierarchical we must make this a deep clone
  private _clone(object: INGXLoggerConfig | any) {
    const cloneConfig: INGXLoggerConfig | any = { level: null };

    Object.keys(object).forEach((key: string) => {
      cloneConfig[key] = object[key];
    });

    return cloneConfig;
  }
}
