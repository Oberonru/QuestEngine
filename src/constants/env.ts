import { config } from 'dotenv';

config();

// Logger
export const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';
export const LOG_DIR = process.env.LOG_DIR ?? 'logs';
