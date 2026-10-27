import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { authService } from '@/services/authService';
import type { IПользователь } from '@/types';

export const useUserStore = defineStore('пользователь', () => {
  const пользователь = useLocalStorage<IПользователь | null>('пользователь', null);
  const загрузка = ref<boolean>(false);

  const текущийПользователь = computed<IПользователь | null>(() => пользователь.value);
  const пользовательЗагружается = computed<boolean>(() => загрузка.value);

  const войти = async (имя: string): Promise<void> => {
    загрузка.value = true;

    try {
      const email = имя.trim() || 'Пользователь';
      const emailСвободен = await authService.проверитьУникальностьEmail(email);

      if (!emailСвободен) {
        throw new Error('Этот email уже используется');
      }

      const ответ = await authService.login({ name: email });
      пользователь.value = {
        идентификатор: 1,
        имя: имя.trim() || 'Пользователь',
      };
      void ответ;
    } finally {
      загрузка.value = false;
    }
  };

  const выйти = (): void => {
    пользователь.value = null;
  };

  return {
    текущийПользователь,
    пользовательЗагружается,
    войти,
    выйти,
  };
});

