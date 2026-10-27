export const нормализоватьЗначениеФормы = (значение: string): string => значение.trim();

export const очиститьОшибкиФормы = (ошибки: Record<string, string>): void => {
  for (const имяПоля of Object.keys(ошибки)) {
    delete ошибки[имяПоля];
  }
};
