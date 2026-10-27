import { computed } from 'vue';
import { defineStore } from 'pinia';
import { Dark } from 'quasar';
import { useLocalStorage } from '@/composables/useLocalStorage';
import type { IУведомление, ТемаПриложения } from '@/types';

export const useUiStore = defineStore('интерфейс', () => {
  const тема = useLocalStorage<ТемаПриложения>('темаПриложения', 'светлая');
  const панельОткрыта = useLocalStorage<boolean>('панельОткрыта', false);
  const уведомления = useLocalStorage<IУведомление[]>('уведомления', []);

  const темнаяТема = computed<boolean>(() => тема.value === 'темная');
  const панельВидима = computed<boolean>(() => панельОткрыта.value);
  const списокУведомлений = computed<IУведомление[]>(() => уведомления.value);

  const применитьТему = (): void => {
    Dark.set(темнаяТема.value);
  };

  const переключитьТему = (): void => {
    тема.value = темнаяТема.value ? 'светлая' : 'темная';
    применитьТему();
  };

  const установитьВидимостьПанели = (открыта: boolean): void => {
    панельОткрыта.value = открыта;
  };

  const переключитьПанель = (): void => {
    панельОткрыта.value = !панельОткрыта.value;
  };

  const добавитьУведомление = (сообщение: string, тип: IУведомление['тип']): void => {
    уведомления.value.push({
      идентификатор: Date.now(),
      сообщение,
      тип,
    });
  };

  const удалитьУведомление = (идентификатор: number): void => {
    уведомления.value = уведомления.value.filter((уведомление) => уведомление.идентификатор !== идентификатор);
  };

  return {
    темнаяТема,
    панельВидима,
    списокУведомлений,
    применитьТему,
    переключитьТему,
    установитьВидимостьПанели,
    переключитьПанель,
    добавитьУведомление,
    удалитьУведомление,
  };
});
