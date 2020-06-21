import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

//Logger Module files
import { LoggerConfig } from './logger.config';
import { MapperService } from './mapper.service';
import { LoggerService } from './logger.service';
import { LoggerHttpService } from './http.service';
import { CustomLoggerService } from './custom-logger.service';

export * from './logger.service';
export * from './types/logger-level.enum';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    LoggerService,
    LoggerHttpService,
    CustomLoggerService,
    MapperService,
    LoggerConfig
  ]
})

export class LoggerModule {
  static forRoot(config: LoggerConfig | null | undefined): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: LoggerConfig, useValue: config || {} },
        LoggerService,
        LoggerHttpService,
        CustomLoggerService,
        MapperService,
      ]
    };
  } //Static Method ends

  static forChild(): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        LoggerService,
        LoggerHttpService,
        CustomLoggerService,
        MapperService
      ]
    };
  } //Static Method ends

} //Class ends
