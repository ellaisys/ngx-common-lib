import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import { LoggerHttpService } from './http.service';
import { LogPosition } from './types/log-position';
import { LoggerLevel } from './types/logger-level.enum';
import { LoggerConfig } from './logger.config';
import { LoggerConfigEngine } from './config.engine';
import { LoggerUtils } from './utils/logger.utils';
import { LoggerMonitor } from './logger-monitor';
import { LogInterface } from './types/ngx-log.interface';
import { MapperService } from './mapper.service';

export const Levels = [
  'TRACE',
  'DEBUG',
  'INFO',
  'LOG',
  'WARN',
  'ERROR',
  'FATAL',
  'OFF'
];


@Injectable()
export class LoggerService {
  private readonly _isIE: boolean;
  private readonly _logFunc: Function;
  private config: LoggerConfigEngine;
  private _customHttpHeaders: HttpHeaders;
  private _customParams: HttpParams;
  private _withCredentials: boolean = false;

  private _loggerMonitor: LoggerMonitor;

  constructor(
    private readonly mapperService: MapperService, 
    private readonly httpService: LoggerHttpService,
    loggerConfig: LoggerConfig
  ) {
    this._isIE = navigator && navigator.userAgent &&
      !!(navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.match(/Trident\//) || navigator.userAgent.match(/Edge\//));

    // each instance of the logger should have their own config engine
    this.config = new LoggerConfigEngine(loggerConfig);

    this._logFunc = this._isIE ? this._logIE.bind(this) : this._logModern.bind(this);
  }

  public trace(message, ...additional: any[]): void {
    this._log(LoggerLevel.TRACE, message, additional);
  }

  public debug(message, ...additional: any[]): void {
    this._log(LoggerLevel.DEBUG, message, additional);
  }

  public info(message, ...additional: any[]): void {
    this._log(LoggerLevel.INFO, message, additional);
  }

  public log(message, ...additional: any[]): void {
    this._log(LoggerLevel.LOG, message, additional);
  }

  public warn(message, ...additional: any[]): void {
    this._log(LoggerLevel.WARN, message, additional);
  }

  public error(message, ...additional: any[]): void {
    this._log(LoggerLevel.ERROR, message, additional);
  }

  public fatal(message, ...additional: any[]): void {
    this._log(LoggerLevel.FATAL, message, additional);
  }

  public setCustomHttpHeaders(headers: HttpHeaders) {
    this._customHttpHeaders = headers;
  }

  public setCustomParams(params: HttpParams) {
    this._customParams = params;
  }

  public setWithCredentialsOptionValue(withCredentials: boolean) {
    this._withCredentials = withCredentials;
  }

  public registerMonitor(monitor: LoggerMonitor) {
    this._loggerMonitor = monitor;
  }

  public updateConfig(config: LoggerConfig) {
    this.config.updateConfig(config);
  }

  public getConfigSnapshot(): LoggerConfig {
    return this.config.getConfig();
  }

  private _logIE(level: LoggerLevel, metaString: string, message: string, additional: any[]): void {

    // Coloring doesn't work in IE
    // make sure additional isn't null or undefined so that ...additional doesn't error
    additional = additional || [];

    switch (level) {
      case LoggerLevel.WARN:
        console.warn(`${metaString} `, message, ...additional);
        break;
      case LoggerLevel.ERROR:
      case LoggerLevel.FATAL:
        console.error(`${metaString} `, message, ...additional);
        break;
      case LoggerLevel.INFO:
        console.info(`${metaString} `, message, ...additional);
        break;
      default:
        console.log(`${metaString} `, message, ...additional);
    }
  }

  private _logModern(level: LoggerLevel, metaString: string, message: string, additional: any[]): void {

    const color = LoggerUtils.getColor(level);

    // make sure additional isn't null or undefined so that ...additional doesn't error
    additional = additional || [];

    switch (level) {
      case LoggerLevel.WARN:
        console.warn(`%c${metaString}`, `color:${color}`, message, ...additional);
        break;
      case LoggerLevel.ERROR:
      case LoggerLevel.FATAL:
        console.error(`%c${metaString}`, `color:${color}`, message, ...additional);
        break;
      case LoggerLevel.INFO:
        console.info(`%c${metaString}`, `color:${color}`, message, ...additional);
        break;
      //  Disabling console.trace since the stack trace is not helpful. it is showing the stack trace of
      // the console.trace statement
      // case LoggerLevel.TRACE:
      //   console.trace(`%c${metaString}`, `color:${color}`, message, ...additional);
      //   break;

      //  Disabling console.debug, because Has this hidden by default.
      // case LoggerLevel.DEBUG:
      //   console.debug(`%c${metaString}`, `color:${color}`, message, ...additional);
      //   break;
      default:
        console.log(`%c${metaString}`, `color:${color}`, message, ...additional);
    }
  }

  private _log(level: LoggerLevel, message, additional: any[] = [], logOnServer: boolean = true): void {
    const config = this.config.getConfig();
    const isLog2Server = logOnServer && config.serverLoggingUrl && level >= config.serverLogLevel;
    const isLogLevelEnabled = level >= config.level;

    //Check if any log is enabled
    if (!(message && (isLog2Server || isLogLevelEnabled))) {
      return;
    } //End if

    const logLevelString = Levels[level];

    message = typeof message === 'function' ? message() : message;
    message = LoggerUtils.prepareMessage(message);

    // only use validated parameters for HTTP requests
    const validatedAdditionalParameters = LoggerUtils.prepareAdditionalParameters(additional);

    const timestamp = new Date().toISOString();

    // const callerDetails = LoggerUtils.getCallerDetails();
    this.mapperService.getCallerDetails(config.enableSourceMaps).subscribe((callerDetails: LogPosition) => {
      const logObject: LogInterface = {
        message: message,
        additional: validatedAdditionalParameters,
        level: level,
        timestamp: timestamp,
        fileName: callerDetails.fileName,
        lineNumber: callerDetails.lineNumber.toString()
      };

      if (this._loggerMonitor && isLogLevelEnabled) {
        this._loggerMonitor.onLog(logObject);
      }

      if (isLog2Server) {
        // make sure the stack gets sent to the server
        message = message instanceof Error ? message.stack : message;
        logObject.message = message;

        const headers = this._customHttpHeaders || new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        const options = {
          headers: headers,
          params: this._customParams || new HttpParams(),
          responseType: config.httpResponseType || 'json',
          withCredentials: this._withCredentials
        };
        // Allow logging on server even if client log level is off
        this.httpService.logOnServer(config.serverLoggingUrl, logObject, options).subscribe((res: any) => {
            // I don't think we should do anything on success
          },
          (error: HttpErrorResponse) => {
            this._log(LoggerLevel.ERROR, `FAILED TO LOG ON SERVER: ${message}`, [error], false);
          }
        );
      } //End if


      // if no message or the log level is less than the environ
      if (isLogLevelEnabled && !config.disableConsoleLogging) {
        const metaString = LoggerUtils.prepareMetaString(timestamp, logLevelString,
          callerDetails.fileName, callerDetails.lineNumber.toString());

        return this._logFunc(level, metaString, message, additional);
      } //End if 
     
    });
  }
}
