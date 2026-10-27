import { shallowRef, ref, type Ref } from 'vue';

export interface РезультатApi<T> {
  данные: Ref<T | null>;
  загрузка: Ref<boolean>;
  ошибка: Ref<Error | null>;
  запрос: (сигнал?: AbortSignal) => Promise<T | null>;
  отменить: () => void;
}

export const useApi = <T>(запрос: (сигнал?: AbortSignal) => Promise<T>): РезультатApi<T> => {
  const данные = shallowRef<T | null>(null);
  const загрузка = ref<boolean>(false);
  const ошибка = ref<Error | null>(null);

  const отменить = (): void => {
    данные.value = null;
    загрузка.value = false;
  };

  const выполнитьЗапрос = async (сигнал?: AbortSignal): Promise<T | null> => {
    загрузка.value = true;
    ошибка.value = null;

    try {
      данные.value = await запрос(сигнал);
      return данные.value;
    } catch (значениеОшибки) {
      ошибка.value = значениеОшибки instanceof Error ? значениеОшибки : new Error('Ошибка API');
      return null;
    } finally {
      загрузка.value = false;
    }
  };

  return {
    данные,
    загрузка,
    ошибка,
    запрос: выполнитьЗапрос,
    отменить,
  };
};

