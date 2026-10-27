import { reactive, ref, type Ref } from 'vue';
import type { ПравилоВалидации } from '@/utils/validation';

export interface РезультатВалидации<T extends Record<string, string>> {
  значения: T;
  ошибки: Record<keyof T, string>;
  валидно: Ref<boolean>;
  проверить: () => boolean;
  проверитьПоле: <K extends keyof T>(имяПоля: K) => boolean;
}

export const useValidation = <T extends Record<string, string>>(
  значения: T,
  правила: { [K in keyof T]: ПравилоВалидации<string>[] },
): РезультатВалидации<T> => {
  const ошибки = reactive<Record<string, string>>({});
  const валидно = ref<boolean>(false);

  const проверитьПоле = <K extends keyof T>(имяПоля: K): boolean => {
    const правилоПоля = правила[имяПоля];
    const значение = значения[имяПоля] ?? '';

    for (const правило of правилоПоля) {
      const результат = правило(значение);

      if (результат !== true) {
        ошибки[String(имяПоля)] = результат;
        return false;
      }
    }

    ошибки[String(имяПоля)] = '';
    return true;
  };

  const проверить = (): boolean => {
    const результаты = (Object.keys(правила) as Array<keyof T>).map(проверитьПоле);
    валидно.value = результаты.every(Boolean);
    return валидно.value;
  };

  return {
    значения,
    ошибки: ошибки as Record<keyof T, string>,
    валидно,
    проверить,
    проверитьПоле,
  };
};
