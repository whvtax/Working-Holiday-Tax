// Where Ella's bundled files live at run time. On Vercel the files are copied
// next to the function by outputFileTracingIncludes (next.config.js); locally
// and in tests they are found under the project root.
import { existsSync } from 'node:fs'
import { join } from 'node:path'

export function ellaAssetsDir(): string {
  return process.env.ELLA_ASSETS_DIR ?? join(process.cwd(), 'src', 'lib', 'ella', 'assets')
}

export function ffmpegBinary(): string {
  if (process.env.ELLA_FFMPEG_PATH) return process.env.ELLA_FFMPEG_PATH
  const local = join(process.cwd(), 'node_modules', 'ffmpeg-static', process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg')
  if (existsSync(local)) return local
  return 'ffmpeg'
}
