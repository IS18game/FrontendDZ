import { describe, expect, it } from 'vitest';
import { правилоEmail, правилоНазванияЗадачи, правилоПароля } from '@/utils/validation';

describe('validation utilities', () => {
  it('validates email, password, and task title', () => {
    expect(правилоEmail('user@example.com')).toBe(true);
    expect(правилоПароля('123456')).toBe(true);
    expect(правилоНазванияЗадачи('Новая задача')).toBe(true);
  });

  it('rejects invalid values', () => {
    expect(правилоEmail('wrong')).toBe('Введите корректный email');
    expect(правилоПароля('123')).toBe('Пароль должен содержать не менее 6 символов');
    expect(правилоНазванияЗадачи('')).toBe('Введите название задачи');
  });
});
