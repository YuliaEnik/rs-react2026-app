import { describe, it, expect } from 'vitest';
import { schema } from '../schema';

describe('Helpers & Schema Validation', () => {
  const calculateStrength = (password: string) => {
    const hasNumber = /[0-9]/.test(password);
    const hasUpper = /[A-ZА-ЯЁ]/.test(password);
    const hasLower = /[a-zа-яё]/.test(password);
    const hasSpecial = /[@$!%*?&_#^]/.test(password);
    return [hasNumber, hasUpper, hasLower, hasSpecial].filter(Boolean).length;
  };

  it('should calculate password strength correctly', () => {
    expect(calculateStrength('aaaa')).toBe(1);
    expect(calculateStrength('aaaa111')).toBe(2);
    expect(calculateStrength('Password123!')).toBe(4);
  });

  it('should fail validation if email has no dot in domain', async () => {
    const isValid = await schema
      .validateAt('email', { email: 'user@domain' })
      .then(() => true)
      .catch(() => false);

    expect(isValid).toBe(false);
  });

  it('should pass validation for correctly formatted email', async () => {
    const isValid = await schema
      .validateAt('email', { email: 'user@domain.com' })
      .then(() => true)
      .catch(() => false);

    expect(isValid).toBe(true);
  });
});
