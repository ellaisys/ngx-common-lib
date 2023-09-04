import { INGXLoggerConfig } from "../config/iconfig";
import { LoggerLevel } from "../types/logger-level.enum";
import { INGXLoggerMetadata } from "./imetadata";

/**
 * Injection token of logger metadata service
 */
export const TOKEN_LOGGER_METADATA_SERVICE = 'TOKEN_LOGGER_METADATA_SERVICE';

export interface INGXLoggerMetadataService {
  /**
   * Gets the content to be logged and some metadata around it
   * @param level 
   * @param config 
   * @param message 
   * @param additional 
   */
  getMetadata(level: LoggerLevel, config: INGXLoggerConfig, message?: any | (() => any), additional?: any[]): INGXLoggerMetadata;
}
