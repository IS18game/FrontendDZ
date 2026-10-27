export type ТемаПриложения = 'светлая' | 'темная';

export interface IПользователь {
  идентификатор: number;
  имя: string;
}

export interface IНастройкиПользователя {
  компактныйРежим: boolean;
}

export interface IУведомление {
  идентификатор: number;
  сообщение: string;
  тип: 'положительное' | 'отрицательное';
}
