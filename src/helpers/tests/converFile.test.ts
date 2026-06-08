import { describe, it, expect, vi } from 'vitest';
import { convertFileToBase64 } from '../converFile';

describe('convertFileToBase64', () => {
  it('should successfully convert a File object to a base64 string', async () => {
    const fileContent = 'hello world';
    const blob = new Blob([fileContent], { type: 'image/png' });
    const file = new File([blob], 'test.png', { type: 'image/png' });

    const result = await convertFileToBase64(file);

    expect(result.startsWith('data:image/png;base64,')).toBe(true);

    expect(result.length).toBeGreaterThan('data:image/png;base64,'.length);
  });
  it('should reject the promise when FileReader encounters an error', async () => {
    const blob = new Blob(['error content'], { type: 'image/png' });
    const file = new File([blob], 'error.png', { type: 'image/png' });

    const spy = vi
      .spyOn(FileReader.prototype, 'readAsDataURL')
      .mockImplementation(function (this: FileReader) {
        setTimeout(() => {
          if (this.onerror) {
            const mockError = new DOMException(
              'Read failed',
              'NotReadableError'
            );

            Object.defineProperty(this, 'error', {
              value: mockError,
              configurable: true,
            });

            this.onerror({} as ProgressEvent<FileReader>);
          }
        }, 0);
      });
    await expect(convertFileToBase64(file)).rejects.toThrow();
    spy.mockRestore();
  });
});
