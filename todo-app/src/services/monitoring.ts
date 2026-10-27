export interface IСобытиеПроизводительности {
  имя: string;
  значение: number;
}

const mockРежим = import.meta.env.VITE_SENTRY_MOCK === 'true';
const dsn = import.meta.env.VITE_SENTRY_DSN;

export const записатьСобытиеОшибки = (ошибка: unknown): void => {
  if (mockРежим || !dsn) {
    return;
  }

  void Promise.resolve(ошибка);
};

export const записатьМетрикуПроизводительности = (метрика: IСобытиеПроизводительности): void => {
  if (mockРежим || !dsn) {
    return;
  }

  void Promise.resolve(метрика);
};

export const запуститьМониторингПроизводительности = (): void => {
  if (!('PerformanceObserver' in window)) {
    return;
  }

  const наблюдатель = new PerformanceObserver((список) => {
    список.getEntries().forEach((запись) => {
      записатьМетрикуПроизводительности({ имя: запись.name, значение: запись.duration });
    });
  });

  наблюдатель.observe({ type: 'navigation', buffered: true });
};
