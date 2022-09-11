import { Inject, Injectable } from '@angular/core';
import { INGXLoggerConfig } from './config/iconfig';
import { LoggerService } from './logger.service';
import { TOKEN_LOGGER_MAPPER_SERVICE, INGXLoggerMapperService } from './mapper/imapper.service';
import { TOKEN_LOGGER_METADATA_SERVICE, INGXLoggerMetadataService } from './metadata/imetadata.service';
import { TOKEN_LOGGER_RULES_SERVICE, INGXLoggerRulesService } from './rules/irules.service';
import { TOKEN_LOGGER_SERVER_SERVICE, INGXLoggerServerService } from './server/iserver.service';
import { TOKEN_LOGGER_WRITER_SERVICE, INGXLoggerWriterService } from './writer/iwriter.service';
import { INGXLoggerMonitor } from './monitor/ilogger-monitor';
import { INGXLoggerConfigEngineFactory, TOKEN_LOGGER_CONFIG_ENGINE_FACTORY } from './config/iconfig-engine-factory';

// Keeping this to avoid any breaking change for now, this class should be removed later

/**
 * CustomNGXLoggerService is designed to allow users to get a new instance of a logger
 * @deprecated The logger is now fully customisable so this class is now useless
 */
@Injectable({
  providedIn: 'root'
})
export class CustomNGXLoggerService {

  constructor(
    @Inject(TOKEN_LOGGER_CONFIG_ENGINE_FACTORY) private configEngineFactory: INGXLoggerConfigEngineFactory,
    @Inject(TOKEN_LOGGER_METADATA_SERVICE) private metadataService: INGXLoggerMetadataService,
    @Inject(TOKEN_LOGGER_RULES_SERVICE) private ruleService: INGXLoggerRulesService,
    @Inject(TOKEN_LOGGER_MAPPER_SERVICE) private mapperService: INGXLoggerMapperService,
    @Inject(TOKEN_LOGGER_WRITER_SERVICE) private writerService: INGXLoggerWriterService,
    @Inject(TOKEN_LOGGER_SERVER_SERVICE) private serverService: INGXLoggerServerService,
  ) { }


  /**
   * Create an instance of a logger
   * @deprecated The logger is now fully customisable so this function is now useless, if you want a specific instance of NGXLogger, either use the new keyword or Angular dependency injection
   * @param config 
   * @param serverService 
   * @param logMonitor 
   * @param mapperService 
   * @returns 
   */
  create(
    config: INGXLoggerConfig,
    serverService?: INGXLoggerServerService,
    logMonitor?: INGXLoggerMonitor,
    mapperService?: INGXLoggerMapperService,
  ): LoggerService {
    const logger = new LoggerService(config, this.configEngineFactory, this.metadataService, this.ruleService, mapperService || this.mapperService, this.writerService, serverService || this.serverService);

    if (logMonitor) {
      logger.registerMonitor(logMonitor);
    }

    return logger;
  }
}


