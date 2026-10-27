import { ref, shallowRef, type Ref } from 'vue';

export interface РезультатАсинхроннойОперации<T> {
  данные: Ref<T | null>;
  загрузка: Ref<boolean>;
  ошибка: Ref<Error | null>;
  выполнить: () => Promise<T | null>;
  отменить: () => void;
}

export const useAsync = <T>(операция: (сигнал: AbortSignal) => Promise<T>): РезультатАсинхроннойОперации<T> => {
  const данные = shallowRef<T | null>(null);
  const загрузка = ref<boolean>(false);
  const ошибка = ref<Error | null>(null);
  let контроллер: AbortController | null = null;

  const отменить = (): void => {
    контроллер?.abort();
    контроллер = null;
    загрузка.value = false;
  };

  const выполнить = async (): Promise<T | null> => {
    отменить();
    контроллер = new AbortController();
    загрузка.value = true;
    ошибка.value = null;

    try {
      данные.value = await операция(контроллер.signal);
      return данные.value;
    } catch (значениеОшибки) {
      if (значениеОшибки instanceof Error && значениеОшибки.name === 'CanceledError') {
        return null;
      }

      ошибка.value = значениеОшибки instanceof Error ? значениеОшибки : new Error('Неизвестная ошибка');
      return null;
    } finally {
      загрузка.value = false;
    }
  };

  return {
    данные,
    загрузка,
    ошибка,
    выполнить,
    отменить,
  };
};


