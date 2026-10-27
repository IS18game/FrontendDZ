import { computed, type ComputedRef, type WritableComputedRef } from 'vue';
import { useTodoStore } from '@/stores/todoStore';
import type { ITodoItem, ТипФильтраЗадач } from '@/types';

export interface РезультатФильтраЗадач {
  фильтр: WritableComputedRef<ТипФильтраЗадач>;
  поиск: WritableComputedRef<string>;
  отфильтрованныеЗадачи: ComputedRef<ITodoItem[]>;
}

export const useTodoFilter = (): РезультатФильтраЗадач => {
  const хранилищеЗадач = useTodoStore();
  const фильтр = computed<ТипФильтраЗадач>({
    get: () => хранилищеЗадач.текущийФильтр,
    set: (значение) => хранилищеЗадач.установитьФильтр(значение),
  });
  const поиск = computed<string>({
    get: () => хранилищеЗадач.текущийПоиск,
    set: (значение) => хранилищеЗадач.установитьПоиск(значение),
  });
  const отфильтрованныеЗадачи = computed<ITodoItem[]>(() => хранилищеЗадач.отфильтрованныеЗадачи);

  return {
    фильтр,
    поиск,
    отфильтрованныеЗадачи,
  };
};

