import { existsSync } from 'node:fs'
import path from 'node:path'
import { SCENES, SVT_IMAGES, type ImageSpec } from './images'

/** Server only (reads the disk at build time): the slot's spec when every
 *  file it needs is in public/svt-assets/img/, otherwise null. */
export function readyImage(id: string, root = process.cwd()): ImageSpec | null {
  const spec = SVT_IMAGES[id]
  if (!spec) return null
  const files = [spec.mobile, spec.desktop].filter((f): f is NonNullable<typeof f> => !!f)
  const all = files.every(f => existsSync(path.join(root, 'public', 'svt-assets', 'img', f.file)))
  return all ? spec : null
}

/** Server only: the scene's spec when its file is in public/svt-assets/img/. */
export function readyScene(id: string | undefined, root = process.cwd()) {
  const sc = id ? SCENES[id] : undefined
  return sc && existsSync(path.join(root, 'public', 'svt-assets', 'img', sc.file)) ? sc : null
}
