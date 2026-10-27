import type { App } from 'vue';
import { запуститьМониторингПроизводительности, записатьСобытиеОшибки } from '@/services/monitoring';

interface IКонтекстЗагрузки {
  app: App;
}

export default ({ app }: IКонтекстЗагрузки): void => {
  app.config.errorHandler = (ошибка: unknown) => {
    записатьСобытиеОшибки(ошибка);
  };

  window.addEventListener('unhandledrejection', (событие) => {
    записатьСобытиеОшибки(событие.reason);
  });

  запуститьМониторингПроизводительности();
};
