import type { Pinia } from 'pinia';
import type { Router } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { именаМаршрутов } from '@/types';

export const установитьGuardsМаршрутов = (router: Router, pinia: Pinia): void => {
  router.beforeEach((маршрут) => {
    const хранилищеПользователя = useUserStore(pinia);

    if (маршрут.meta.требуетАвторизации && !хранилищеПользователя.текущийПользователь) {
      return {
        name: именаМаршрутов.вход,
        query: {
          redirect: маршрут.fullPath,
        },
      };
    }

    if (маршрут.name === именаМаршрутов.вход && хранилищеПользователя.текущийПользователь) {
      return {
        name: именаМаршрутов.главная,
      };
    }

    return true;
  });
};
