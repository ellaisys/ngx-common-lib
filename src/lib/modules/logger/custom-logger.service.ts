import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { LoggerConfig } from './logger.config';
import { LoggerHttpService } from './http.service';
import { LoggerService } from './logger.service';
import { LoggerMonitor } from './logger-monitor';
import { MapperService } from './mapper.service';


/**
 * CustomLoggerService is designed to allow users to get a new instance of a logger
 */
@Injectable()
export class CustomLoggerService {

  /**
   * Default constructor
   */
  constructor(
    private readonly mapperService: MapperService,
    private readonly httpService: LoggerHttpService
  ) {
  }

  /**
   * Create Logger Service
   * 
   * @param config 
   * @param httpService 
   * @param logMonitor 
   * @param mapperService 
   */
  create(config: LoggerConfig, httpService?: LoggerHttpService, logMonitor?: LoggerMonitor,
         mapperService?: MapperService): LoggerService {

    // you can inject your own httpService or use the default,
    const logger = new LoggerService(mapperService || this.mapperService,
      httpService || this.httpService, config);

    if (logMonitor) {
      logger.registerMonitor(logMonitor);
    } //End if

    return logger;
  } //Function ends

} //Class ends


