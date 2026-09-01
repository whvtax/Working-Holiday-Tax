/**
 * Upload validation must not reject legitimate photos (Jo, 1 Sep).
 *
 * FOUND IN PRODUCTION on the live tax form: a customer's bank statement and
 * passport selfie were rejected with "File contains potentially dangerous
 * content". The cause was containsDangerous(): it scanned the first 8192 bytes
 * for each signature "anywhere", including "MZ" (two bytes, 0x4D 0x5A, the
 * Windows-exe marker). After a JPEG's header the bytes are entropy-coded and
 * effectively random, so that two-byte sequence appears by chance in roughly one
 * in eight real photos, and the upload was refused.
 *
 * The fix checks executable/script signatures at the very START of the file
 * only. validateMagicBytes() has already proven the file is a genuine image/PDF
 * there, and uploads live in a private bucket and are never executed, so bytes
 * deeper inside a valid image are harmless data.
 */
import { containsDangerous, validateMagicBytes } from '@/app/api/tax-form/upload/route';

/** Build an ArrayBuffer from a JPEG header plus arbitrary trailing bytes. */
function jpegWith(trailing: number[]): ArrayBuffer {
  const header = [0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46]; // JFIF
  return new Uint8Array([...header, ...trailing]).buffer;
}

describe('containsDangerous', () => {
  it('does NOT flag a real JPEG that happens to contain "MZ" deep inside', () => {
    // The exact regression: 0x4D 0x5A ("MZ") sitting in the image data.
    const buf = jpegWith([0x11, 0x22, 0x4D, 0x5A, 0x33, 0x44, 0x4D, 0x5A]);
    expect(containsDangerous(buf)).toBe(false);
  });

  it('does NOT flag a real JPEG that contains the bytes of "<script" deep inside', () => {
    const script = [0x3C, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74];
    const buf = jpegWith([0x00, 0x01, ...script, 0x02]);
    expect(containsDangerous(buf)).toBe(false);
  });

  it('still flags an actual Windows executable (MZ at the very start)', () => {
    const buf = new Uint8Array([0x4D, 0x5A, 0x90, 0x00, 0x03]).buffer;
    expect(containsDangerous(buf)).toBe(true);
  });

  it('still flags a PHP file (<?php at the very start)', () => {
    const buf = new Uint8Array([0x3C, 0x3F, 0x70, 0x68, 0x70, 0x20]).buffer; // <?php
    expect(containsDangerous(buf)).toBe(true);
  });

  it('still flags an ELF binary and an HTML <script file at the start', () => {
    expect(containsDangerous(new Uint8Array([0x7F, 0x45, 0x4C, 0x46, 0x01]).buffer)).toBe(true);
    expect(containsDangerous(new Uint8Array([0x3C, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74]).buffer)).toBe(true);
  });
});

describe('validateMagicBytes still gates the declared type', () => {
  it('accepts a genuine JPEG and a HEIC-as-jpeg (iOS)', () => {
    expect(validateMagicBytes(jpegWith([]), 'image/jpeg')).toBe(true);
    const heic = new Uint8Array([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]).buffer; // ftyp at 4
    expect(validateMagicBytes(heic, 'image/jpeg')).toBe(true);
  });

  it('rejects an executable that lies about being a JPEG', () => {
    const exe = new Uint8Array([0x4D, 0x5A, 0x90, 0x00]).buffer;
    expect(validateMagicBytes(exe, 'image/jpeg')).toBe(false);
  });
});
