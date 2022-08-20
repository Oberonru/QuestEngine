import { format, createLogger, transports, Logger } from 'winston';
import { TransformableInfo } from 'logform';
import { LOG_DIR, LOG_LEVEL } from '../constants/env';

let loggerInstance: Logger | undefined;

export function logger(): Logger {
  if (loggerInstance) {
    return loggerInstance;
  }

  const path = (filename: string): string => `${LOG_DIR}/${filename}`;

  const printToFile = (info: TransformableInfo): string => {
    const { level, message, metadata } = info;
    const { timestamp, stack, ...restMeta } = metadata as { timestamp: string; stack: string };
    let result = `${level} [${timestamp}]: ${message}`;

    if (stack && (LOG_LEVEL === 'debug' || LOG_LEVEL === 'silly')) {
      result += `\n${stack}`;
    }

    if (Object.keys(restMeta).length) {
      result += `\n${metadata}: ${JSON.stringify(restMeta)}`;
    }

    return result;
  };

  const printToConsole = (info: TransformableInfo): string => {
    const { level, message, metadata } = info;
    const { timestamp, stack, ...restMeta } = metadata as { timestamp: string; stack: string };
    const color = format.colorize();
    let result = `${color.colorize(level, level.padEnd(7))} [${timestamp}]: ${message}`;

    if (stack && (LOG_LEVEL === 'debug' || LOG_LEVEL === 'silly')) {
      result += `\n${stack}`;
    }

    if (Object.keys(restMeta).length) {
      result += `\n${color.colorize('info', 'metadata')}: ${JSON.stringify(restMeta)}`;
    }

    return result;
  };

  loggerInstance = createLogger({
    level: LOG_LEVEL,
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.metadata(),
    ),

    transports: [
      new transports.File({
        filename: path('error.log'),
        level: 'error',
        format: format.printf(printToFile),
      }),
      new transports.File({
        filename: path('info.log'),
        level: 'info',
        format: format.printf(printToFile),
      }),
      new transports.Console({
        level: LOG_LEVEL,
        format: format.printf(printToConsole),
      }),
    ],
  });

  return loggerInstance;
}
