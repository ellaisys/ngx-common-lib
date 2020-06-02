import { inject, TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';
import { LoggerHttpService } from './http.service';
import { LoggerHttpServiceMock } from '../testing/src/lib/http.service.mock';
import { MapperService } from './mapper.service';
import { MapperServiceMock } from '../testing/src/lib/mapper.service.mock';
import { LoggerConfig } from './logger.config';
import { LoggerLevel } from './types/logger-level.enum';


describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService,
        {provide: LoggerHttpService, useClass: LoggerHttpServiceMock},
        {provide: MapperService, useClass: MapperServiceMock},
        {provide: LoggerConfig, useValue: {level: LoggerLevel.ERROR}}
      ]
    });
  });

  it('should handle circular structures', inject(
    [LoggerService],
    (logger: LoggerService) => {
      const a = {
        test: 'test'
      };

      a['a'] = a;

      spyOn(console, 'error');
      spyOn(console, 'warn');


      logger.error('warn', a);
      logger.error('test', a);

      expect(console.error).toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
    }
  ));

  describe('trace', () => {
    it('should call _log with trace', inject(
      [LoggerService],
      (logger: LoggerService) => {


        const logSpy = spyOn(<any>logger, '_log');

        logger.trace('message');

        expect(logSpy).toHaveBeenCalledWith(LoggerLevel.TRACE, 'message', []);
      }
    ));
  });

  describe('debug', () => {
    it('should call _log with debug', inject(
      [LoggerService],
      (logger: LoggerService) => {


        const logSpy = spyOn(<any>logger, '_log');

        logger.debug('message');

        expect(logSpy).toHaveBeenCalledWith(LoggerLevel.DEBUG, 'message', []);
      }
    ));
  });

  describe('info', () => {
    it('should call _log with info', inject(
      [LoggerService],
      (logger: LoggerService) => {


        const logSpy = spyOn(<any>logger, '_log');

        logger.info('message');

        expect(logSpy).toHaveBeenCalledWith(LoggerLevel.INFO, 'message', []);
      }
    ));
  });

  describe('log', () => {
    it('should call _log with log', inject(
      [LoggerService],
      (logger: LoggerService) => {


        const logSpy = spyOn(<any>logger, '_log');

        logger.log('message');

        expect(logSpy).toHaveBeenCalledWith(LoggerLevel.LOG, 'message', []);
      }
    ));
  });

  describe('warn', () => {
    it('should call _log with warn', inject(
      [LoggerService],
      (logger: LoggerService) => {


        const logSpy = spyOn(<any>logger, '_log');

        logger.warn('message');

        expect(logSpy).toHaveBeenCalledWith(LoggerLevel.WARN, 'message', []);
      }
    ));
  });

  describe('error', () => {
    it('should call _log with error', inject(
      [LoggerService],
      (logger: LoggerService) => {


        const logSpy = spyOn(<any>logger, '_log');

        logger.error('message');

        expect(logSpy).toHaveBeenCalledWith(LoggerLevel.ERROR, 'message', []);
      }
    ));
  });

  describe('fatal', () => {
    it('should call _log with fatal', inject(
      [LoggerService],
      (logger: LoggerService) => {


        const logSpy = spyOn(<any>logger, '_log');

        logger.fatal('message');

        expect(logSpy).toHaveBeenCalledWith(LoggerLevel.FATAL, 'message', []);
      }
    ));
  });

  describe('setCustomHttpHeaders', () => {
    // TODO
  });

  describe('setCustomParams', () => {
    // TODO
  });

  describe('setWithCredentialsOptionValue', () => {
    // TODO
  });

  describe('registerMonitor', () => {
    // TODO
  });

  describe('updateConfig', () => {
    // TODO
  });

  describe('getConfigSnapshot', () => {
    // TODO
  });

  describe('_logIE', () => {
    // TODO
  });

  describe('_logModern', () => {
    // TODO
  });

  describe('_log', () => {
    // TODO
  });
});
