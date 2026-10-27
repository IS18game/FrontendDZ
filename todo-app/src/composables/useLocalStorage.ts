import { ref, watch, type Ref } from 'vue';

export const useLocalStorage = <T>(ключ: string, начальноеЗначение: T): Ref<T> => {
  const получитьЗначение = (): T => {
    if (typeof window === 'undefined') {
      return начальноеЗначение;
    }

    const сохраненноеЗначение = window.localStorage.getItem(ключ);

    if (!сохраненноеЗначение) {
      return начальноеЗначение;
    }

    try {
      return JSON.parse(сохраненноеЗначение) as T;
    } catch {
      return начальноеЗначение;
    }
  };

  const значение = ref(получитьЗначение()) as Ref<T>;

  watch(
    значение,
    (новоеЗначение) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(ключ, JSON.stringify(новоеЗначение));
      }
    },
    { deep: true },
  );

  return значение;
};
