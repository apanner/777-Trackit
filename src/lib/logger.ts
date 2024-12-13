import { storage } from '../services/storage';

type LogLevel = 'info' | 'warn' | 'error' | 'success';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private readonly MAX_LOGS = 100;
  private static instance: Logger;

  private constructor() {
    this.loadLogs();
    this.info('Logger initialized');
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private loadLogs() {
    const savedLogs = storage.get('app_logs');
    if (savedLogs) {
      this.logs = savedLogs;
    }
  }

  private saveLogs() {
    storage.set('app_logs', this.logs);
  }

  private addLog(level: LogLevel, message: string, details?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      details
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    this.saveLogs();
    
    const styles = {
      info: 'color: #3b82f6',
      warn: 'color: #f59e0b',
      error: 'color: #ef4444',
      success: 'color: #10b981'
    };

    console.log(
      `%c${entry.timestamp} [${level.toUpperCase()}] ${message}`,
      styles[level]
    );
    if (details) {
      console.log(details);
    }
  }

  info(message: string, details?: any) {
    this.addLog('info', message, details);
  }

  warn(message: string, details?: any) {
    this.addLog('warn', message, details);
  }

  error(message: string, details?: any) {
    this.addLog('error', message, details);
  }

  success(message: string, details?: any) {
    this.addLog('success', message, details);
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
    this.saveLogs();
    this.info('Logs cleared');
  }
}

export const logger = Logger.getInstance();