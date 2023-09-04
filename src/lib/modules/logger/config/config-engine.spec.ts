import { inject, TestBed } from '@angular/core/testing';
import { LoggerLevel } from '../types/logger-level.enum';
import { NGXLoggerConfigEngine } from './config-engine';
import { TOKEN_LOGGER_CONFIG } from './iconfig';

describe('NGXLoggerConfigEngine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  describe('get level', () => {
    it('should return good level', () => {
      const configEngine = new NGXLoggerConfigEngine({ level: LoggerLevel.ERROR });

      expect(configEngine.level).toEqual(LoggerLevel.ERROR);
    });
  });

  describe('get serverLogLevel', () => {
    it('should return good serverLogLevel', () => {
      const configEngine = new NGXLoggerConfigEngine({ level: LoggerLevel.ERROR });

      expect(configEngine.serverLogLevel).toBe(undefined);
    });
  });

  describe('updateConfig', () => {
    it('should update config without keeping the reference to the object', () => {
      const configEngine = new NGXLoggerConfigEngine({ level: LoggerLevel.ERROR });
      const myNewConfig = { level: LoggerLevel.FATAL, serverLoggingUrl: 'test' };

      configEngine.updateConfig(myNewConfig);

      expect(configEngine['config'].serverLoggingUrl).toEqual('test');

      myNewConfig.serverLoggingUrl = 'changed value';

      // if value here is 'changed value', this means the update config took the reference to the object
      // we don't want that because if the object is changed later it also changes the logger config
      expect(configEngine['config'].serverLoggingUrl).toEqual('test');
    });
  });

  describe('getConfig', () => {
    it('should get config without sending the reference to the object', () => {
      const configEngine = new NGXLoggerConfigEngine({ level: LoggerLevel.FATAL, serverLoggingUrl: 'test' });

      const config = configEngine.getConfig();

      expect(config.serverLoggingUrl).toEqual('test');

      config.serverLoggingUrl = 'changed value';

      // if value here is 'changed value', this means the get config returned the reference to the object
      // we don't want that because if the object is changed later it also changes the logger config
      expect(configEngine.getConfig().serverLoggingUrl).toEqual('test');
    });
  });
});
