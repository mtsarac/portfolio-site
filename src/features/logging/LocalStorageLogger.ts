import { LoggingService } from './LoggingService'
import type { LogEvent } from '../../types'

const STORAGE_KEY = 'portfolio_logs'

export class LocalStorageLogger extends LoggingService {
  log(event: LogEvent): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const logs: LogEvent[] = stored ? JSON.parse(stored) : []
      logs.push(event)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
    } catch {
      // localStorage dolu olabilir, sessizce geç
    }
  }

  getAll(): LogEvent[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }
}
