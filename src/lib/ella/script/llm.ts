/**
 * The model connection. Server side only: the key is read from the
 * environment at call time and never logged or sent anywhere else.
 */
export interface LlmResult { text: string; model: string; inputTokens: number; outputTokens: number; stopReason?: string }
export interface Llm { complete(system: string, user: string): Promise<LlmResult> }

export class AnthropicLlm implements Llm {
  constructor(
    private opts: { apiKey?: string; model?: string; maxTokens?: number; fetchImpl?: typeof fetch } = {},
  ) {}

  async complete(system: string, user: string): Promise<LlmResult> {
    const apiKey = this.opts.apiKey ?? process.env.ANTHROPIC_API_KEY
    const model = this.opts.model ?? process.env.ELLA_SCRIPT_MODEL ?? process.env.CLAUDE_MODEL
    if (!apiKey) throw new Error('Missing ANTHROPIC_API_KEY')
    if (!model) throw new Error('Missing ELLA_SCRIPT_MODEL (or CLAUDE_MODEL)')
    const res = await (this.opts.fetchImpl ?? fetch)('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model,
        max_tokens: this.opts.maxTokens ?? 16000,
        system,
        messages: [{ role: 'user', content: user }],
      }),
    })
    if (!res.ok) {
      const detail = await res.text().then(t => t.replace(/\s+/g, ' ').slice(0, 200)).catch(() => '')
      throw new Error(`Model call failed: HTTP ${res.status}${detail ? ` ${detail}` : ''}`)
    }
    const body = await res.json() as { content?: Array<{ type: string; text?: string }>; usage?: { input_tokens?: number; output_tokens?: number }; model?: string; stop_reason?: string }
    const text = (body.content ?? []).filter(c => c.type === 'text').map(c => c.text ?? '').join('')
    return { text, model: body.model ?? model, inputTokens: body.usage?.input_tokens ?? 0, outputTokens: body.usage?.output_tokens ?? 0, stopReason: body.stop_reason }
  }
}
