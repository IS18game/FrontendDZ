import { describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { классифицироватьОшибку, получитьСообщениеОшибки, записатьОшибка } from '@/utils/errorHandling';

describe('error handling utilities', () => {
  it('classifies network errors without exposing technical details', () => {
    const ошибка = new Error('details');
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    const результат = классифицироватьОшибку(ошибка);
    expect(результат.тип).toBe('сетевая');
    expect(результат.сообщениеПользователю).toContain('Попробуйте ещё раз');
    vi.restoreAllMocks();
  });

  it('returns a safe application message and handles an error event', () => {
    expect(получитьСообщениеОшибки(null)).toBe('');
    expect(() => записатьОшибка(new Error('ошибка'))).not.toThrow();
  });
});

