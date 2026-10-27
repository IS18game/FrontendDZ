import type { RouteRecordRaw } from 'vue-router';

export * from './api';
export * from './todo';
export * from './user';

export const именаМаршрутов = {
  главная: 'главная',
  настройки: 'настройки',
  вход: 'вход',
  неНайдено: 'не-найдено',
} as const;

export type ИмяМаршрута = (typeof именаМаршрутов)[keyof typeof именаМаршрутов];
export type МаршрутПриложения = RouteRecordRaw & {
  name?: ИмяМаршрута;
};

declare module 'vue-router' {
  interface RouteMeta {
    требуетАвторизации?: boolean;
    хлебнаяКрошка?: string;
    заголовок?: string;
    описание?: string;
  }
}

