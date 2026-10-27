// Types for the CommonJS routing module shared with next.config.js.
interface HostCondition { type: 'host'; value: string }
interface RewriteRule { source: string; destination: string; has?: HostCondition[]; missing?: HostCondition[] }
declare const routing: {
  SVT_HOSTS: string[]
  SVT_SEGMENT: string
  SVT_ASSETS: string
  SVT_API_ALLOWLIST: string[]
  SVT_FORM_ROUTES: string[]
  svtApiAllowlist(env?: Record<string, string | undefined>): string[]
  NOT_FOUND_PATH: string
  svtHost(): HostCondition
  svtHostPattern(): string
  brandRewrites(allowlist?: string[]): RewriteRule[]
  whtOnly<T extends { missing?: HostCondition[] }>(rules: T[]): T[]
}
export = routing
