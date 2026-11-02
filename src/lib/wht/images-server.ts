import { existsSync } from 'node:fs'
import path from 'node:path'
import { SCENES, WHT_IMAGES, type ImageSpec } from './images'

/** Server only (reads the disk at build time): the slot's spec when every file
 *  it needs is in public/wht-assets/img/, otherwise null. */
export function readyImage(id: string, root = process.cwd()): ImageSpec | null {
  const spec = WHT_IMAGES[id]
  if (!spec) return null
  const files = [spec.mobile, spec.desktop].filter((f): f is NonNullable<typeof f> => !!f)
  return files.every(f => existsSync(path.join(root, 'public', 'wht-assets', 'img', f.file))) ? spec : null
}

/** Server only: the scene's spec when its file is in public/wht-assets/img/. */
export function readyScene(id: string | undefined, root = process.cwd()) {
  const sc = id ? SCENES[id] : undefined
  return sc && existsSync(path.join(root, 'public', 'wht-assets', 'img', sc.file)) ? sc : null
}
