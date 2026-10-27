import { ref } from 'vue';
import { записатьОшибка } from '@/utils/errorHandling';

export const useErrorHandler = () => {
  const ошибка = ref<string>('');

  const обработать = (значениеОшибки: unknown, сообщение = 'Произошла ошибка. Попробуйте ещё раз.'): void => {
    записатьОшибка(значениеОшибки);
    ошибка.value = сообщение;
  };

  const очистить = (): void => {
    ошибка.value = '';
  };

  return {
    ошибка,
    обработать,
    очистить,
  };
};
