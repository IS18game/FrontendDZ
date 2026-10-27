import { z } from 'zod';

export const схемаEmail = z.string().trim().email('Введите корректный email');
export const схемаПароля = z.string().min(6, 'Пароль должен содержать не менее 6 символов');
export const схемаНазванияЗадачи = z.string().trim().min(1, 'Введите название задачи').max(120, 'Название слишком длинное');

export type ПравилоВалидации<T> = (значение: T) => true | string;

export const правилоEmail: ПравилоВалидации<string> = (значение) => {
  const результат = схемаEmail.safeParse(значение);
  return результат.success ? true : результат.error.issues[0]?.message ?? 'Некорректный email';
};

export const правилоПароля: ПравилоВалидации<string> = (значение) => {
  const результат = схемаПароля.safeParse(значение);
  return результат.success ? true : результат.error.issues[0]?.message ?? 'Некорректный пароль';
};

export const правилоНазванияЗадачи: ПравилоВалидации<string> = (значение) => {
  const результат = схемаНазванияЗадачи.safeParse(значение);
  return результат.success ? true : результат.error.issues[0]?.message ?? 'Некорректное название';
};

export const правилоОбязательногоПоля = (сообщение: string): ПравилоВалидации<string> =>
  (значение) => Boolean(значение.trim()) || сообщение;
