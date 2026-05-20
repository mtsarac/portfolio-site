import type { LogEvent } from '../../types'

/**
 * Soyut logging servisi.
 * Yeni bir logging provider (Google Analytics, Umami, Plausible vb.)
 * eklemek için bu sınıfı extend et ve register et.
 */
export abstract class LoggingService {
  abstract log(event: LogEvent): void

  logPageView(page: string): void {
    this.log({ type: 'pageview', name: page, timestamp: new Date().toISOString() })
  }

  logEvent(name: string, data?: Record<string, unknown>): void {
    this.log({ type: 'event', name, data, timestamp: new Date().toISOString() })
  }
}
