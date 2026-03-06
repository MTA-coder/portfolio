/**
 * Microsoft Clarity global type declarations.
 *
 * Clarity exposes a global `clarity()` function after its snippet loads.
 * These typings make the API fully type-safe across the React codebase.
 *
 * @see https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
 */

export {}

declare global {
  interface Window {
    clarity?: ClarityFunction
  }

  type ClarityFunction = {
    /** Queue a Clarity command */
    (method: 'set', key: string, value: string): void
    /** Identify the current user session */
    (
      method: 'identify',
      customId: string,
      customSessionId?: string,
      customPageId?: string,
      friendlyName?: string,
    ): void
    /** Fire a custom event */
    (method: 'event', eventName: string): void
    /** Upgrade the session to record at full fidelity */
    (method: 'upgrade', reason: string): void
    /** Opt-in or opt-out of Clarity tracking */
    (method: 'consent'): void
    /** Generic fallback */
    (method: string, ...args: unknown[]): void
    /** Internal queue */
    q?: unknown[][]
  }
}
