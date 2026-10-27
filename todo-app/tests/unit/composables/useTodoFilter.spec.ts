import { describe, expect, it, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useTodoFilter } from '@/composables/useTodoFilter';
import { useTodoStore } from '@/stores/todoStore';

describe('useTodoFilter', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.setItem(
      'задачи',
      JSON.stringify([
        { идентификатор: 1, название: 'Изучить Vue', выполнена: false, датаСоздания: '2026-01-01T00:00:00.000Z' },
        { идентификатор: 2, название: 'Написать тесты', выполнена: true, датаСоздания: '2026-01-02T00:00:00.000Z' },
      ]),
    );
  });

  it('filters all, active, and completed tasks', () => {
    const store = useTodoStore();
    const результат = useTodoFilter();
    store.установитьФильтр('активные');
    expect(результат.отфильтрованныеЗадачи.value).toHaveLength(1);
    store.установитьФильтр('выполненные');
    expect(результат.отфильтрованныеЗадачи.value[0]?.название).toBe('Написать тесты');
  });

  it('searches by task title case-insensitively', () => {
    const store = useTodoStore();
    const результат = useTodoFilter();
    store.установитьПоиск('vue');
    expect(результат.отфильтрованныеЗадачи.value).toHaveLength(1);
  });
});
