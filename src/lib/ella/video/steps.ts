// The paid-step ledger's row shape (table ella_steps, migration 051). One row
// per paid call; the pipeline reads it before every call, so a crash or a
// retry never submits the same job twice. Storage is in ../store.ts.
export type StepKind = 'voice' | 'ella_scene' | 'clip' | 'render' | 'qa'
export type StepStatus = 'pending' | 'submitted' | 'completed' | 'failed' | 'superseded'

export interface Step {
  id: string
  productionId: string
  scriptVersion: number
  kind: StepKind
  scene: number
  attempt: number
  status: StepStatus
  providerJobId: string | null
  idempotencyKey: string
  input: Record<string, unknown>
  output: Record<string, unknown>
  costUsd: number | null
  error: string | null
  createdAt?: string
  updatedAt?: string
}
