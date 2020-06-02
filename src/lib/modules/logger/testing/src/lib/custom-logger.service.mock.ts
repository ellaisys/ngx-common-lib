import { LoggerServiceMock } from './logger.service.mock';

/**
 * CustomLoggerServiceMock is a mock for CustomNGXLoggerService
 */
export class CustomLoggerServiceMock {

  constructor() {
  }

  create(): LoggerServiceMock {
    // you can inject your own httpService or use the default,
    return new LoggerServiceMock();
  }
}


