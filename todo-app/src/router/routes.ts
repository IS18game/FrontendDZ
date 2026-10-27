import { defineAsyncComponent } from 'vue';
import type { МаршрутПриложения } from '@/types';
import { именаМаршрутов } from '@/types';

export const маршруты: МаршрутПриложения[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      требуетАвторизации: true,
      заголовок: 'Список задач',
      описание: 'Управление личным списком задач.',
    },
    children: [
      {
        name: именаМаршрутов.главная,
        path: '',
        component: defineAsyncComponent(() => import('@/pages/IndexPage.vue')),
        meta: {
          требуетАвторизации: true,
          хлебнаяКрошка: 'Задачи',
          заголовок: 'Список задач',
          описание: 'Создавайте, выполняйте и удаляйте задачи.',
        },
      },
      {
        name: именаМаршрутов.настройки,
        path: 'settings',
        component: defineAsyncComponent(() => import('@/pages/SettingsPage.vue')),
        meta: {
          требуетАвторизации: true,
          хлебнаяКрошка: 'Настройки',
          заголовок: 'Настройки',
          описание: 'Настройки аккаунта и отображения приложения.',
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        name: именаМаршрутов.вход,
        path: '',
        component: defineAsyncComponent(() => import('@/pages/LoginPage.vue')),
        meta: {
          хлебнаяКрошка: 'Вход',
          заголовок: 'Вход',
          описание: 'Войдите в приложение для управления задачами.',
        },
      },
    ],
  },
  {
    name: именаМаршрутов.неНайдено,
    path: '/404',
    component: defineAsyncComponent(() => import('@/pages/NotFoundPage.vue')),
    meta: {
      хлебнаяКрошка: 'Страница не найдена',
      заголовок: 'Страница не найдена',
      описание: 'Запрошенная страница не существует.',
    },
  },
  {
    path: '/:путьСовпадения(.*)*',
    redirect: {
      name: именаМаршрутов.неНайдено,
    },
  },
];

