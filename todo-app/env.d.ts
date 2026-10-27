interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_MOCK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
