import { describe, expect, it } from 'vitest';
import { reactive } from 'vue';
import { useValidation } from '@/composables/useValidation';
import { правилоEmail, правилоНазванияЗадачи, правилоПароля } from '@/utils/validation';

describe('useValidation', () => {
  it('returns validation errors for invalid values', () => {
    const значения = reactive({ email: 'wrong', пароль: '123', название: '' });
    const результат = useValidation(значения, {
      email: [правилоEmail],
      пароль: [правилоПароля],
      название: [правилоНазванияЗадачи],
    });
    expect(результат.проверить()).toBe(false);
    expect(результат.ошибки.email).toBe('Введите корректный email');
  });

  it('accepts valid values', () => {
    const значения = reactive({ email: 'user@example.com', пароль: '123456', название: 'Задача' });
    const результат = useValidation(значения, {
      email: [правилоEmail],
      пароль: [правилоПароля],
      название: [правилоНазванияЗадачи],
    });
    expect(результат.проверить()).toBe(true);
    expect(результат.валидно.value).toBe(true);
  });
});
