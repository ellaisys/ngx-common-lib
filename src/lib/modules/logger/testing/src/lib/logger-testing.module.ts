import { NgModule } from '@angular/core';

import { LoggerModule } from '../../../lib/logger.module';
import { LoggerService } from '../../../lib/logger.service';
import { LoggerHttpService } from '../../../lib/http.service';
import { CustomLoggerService } from '../../../lib/custom-logger.service';
import { MapperService } from '../../../lib/mapper.service';

import { LoggerServiceMock } from './logger.service.mock';
import { LoggerHttpServiceMock } from './http.service.mock';
import { CustomLoggerServiceMock } from './custom-logger.service.mock';
import { MapperServiceMock } from './mapper.service.mock';


@NgModule({
  imports: [LoggerModule],
  providers: [
    { provide: LoggerService, useClass: LoggerServiceMock },
    { provide: LoggerHttpService, useClass: LoggerHttpServiceMock },
    { provide: CustomLoggerService, useClass: CustomLoggerServiceMock },
    { provide: MapperService, useClass: MapperServiceMock }
  ]
})
export class LoggerTestingModule {}
