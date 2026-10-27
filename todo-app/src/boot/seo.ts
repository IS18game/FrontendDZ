import type { Router, RouteLocationNormalizedLoaded } from 'vue-router';

interface IКонтекстЗагрузки {
  router: Router;
}

const обновитьМетаТег = (селектор: string, атрибут: 'name' | 'property', имя: string, значение: string): void => {
  const элемент = document.querySelector<HTMLMetaElement>(селектор);

  if (элемент) {
    элемент.content = значение;
    return;
  }

  const новыйЭлемент = document.createElement('meta');
  новыйЭлемент.setAttribute(атрибут, имя);
  новыйЭлемент.content = значение;
  document.head.appendChild(новыйЭлемент);
};

const обновитьМетаДанные = (маршрут: RouteLocationNormalizedLoaded): void => {
  const заголовок = маршрут.meta.заголовок ?? 'Список задач';
  const описание = маршрут.meta.описание ?? 'Приложение для управления списком задач.';

  document.title = `${заголовок} | Список задач`;
  обновитьМетаТег('meta[name="description"]', 'name', 'description', описание);
  обновитьМетаТег('meta[property="og:description"]', 'property', 'og:description', описание);
  обновитьМетаТег('meta[property="og:title"]', 'property', 'og:title', заголовок);
};

export default ({ router }: IКонтекстЗагрузки): void => {
  router.afterEach(обновитьМетаДанные);
};
