import {LogInterface} from './types/ngx-log.interface';

export abstract class LoggerMonitor {
  abstract onLog(logObject: LogInterface): void;
}
