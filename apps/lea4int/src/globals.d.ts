declare interface Window {
  grecaptcha: {
    ready: <R>(callback: () => R | Promise<R>) => Promise<R>
    execute: (siteKey: string, options: { action: string }) => Promise<string>
  }
}
