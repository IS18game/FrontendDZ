import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { todoService } from '@/services/todoService';
import type { ОбновитьЗадачуЗапрос, ОшибкаПриложения, ITodoItem, ТипФильтраЗадач } from '@/types';
import type { IApiTodo } from '@/services/types';

const преобразоватьЗадачу = (задача: IApiTodo): ITodoItem => ({
  идентификатор: задача.id,
  название: задача.title,
  выполнена: задача.completed,
  датаСоздания: задача.createdAt,
});

const получитьСообщениеОшибки = (_значениеОшибки: unknown, запасноеСообщение: string): ОшибкаПриложения => ({
  тип: 'сервис',
  код: 'ОШИБКА_СЕРВИСА',
  сообщение: запасноеСообщение,
});

export const useTodoStore = defineStore('задачи', () => {
  const задачи = useLocalStorage<ITodoItem[]>('задачи', []);
  const фильтр = useLocalStorage<ТипФильтраЗадач>('фильтрЗадач', 'все');
  const поиск = useLocalStorage<string>('поискЗадач', '');
  const загрузка = ref<boolean>(false);
  const ошибка = ref<ОшибкаПриложения | null>(null);

  const отфильтрованныеЗадачи = computed<ITodoItem[]>(() => {
    const поисковыйЗапрос = поиск.value.trim().toLowerCase();

    return задачи.value.filter((задача) => {
      const соответствуетПоиску = задача.название.toLowerCase().includes(поисковыйЗапрос);
      const соответствуетФильтру =
        фильтр.value === 'все' ||
        (фильтр.value === 'активные' && !задача.выполнена) ||
        (фильтр.value === 'выполненные' && задача.выполнена);

      return соответствуетПоиску && соответствуетФильтру;
    });
  });
  const текущийФильтр = computed<ТипФильтраЗадач>(() => фильтр.value);
  const текущийПоиск = computed<string>(() => поиск.value);
  const загружается = computed<boolean>(() => загрузка.value);
  const текущаяОшибка = computed<ОшибкаПриложения | null>(() => ошибка.value);

  const загрузитьЗадачи = async (): Promise<void> => {
    загрузка.value = true;
    ошибка.value = null;

    try {
      const ответ = await todoService.getAll();
      задачи.value = ответ.map(преобразоватьЗадачу);
    } catch (значениеОшибки) {
      ошибка.value = получитьСообщениеОшибки(значениеОшибки, 'Не удалось загрузить задачи');
    } finally {
      загрузка.value = false;
    }
  };

  const добавитьЗадачу = async (название: string): Promise<void> => {
    загрузка.value = true;
    ошибка.value = null;

    try {
      const текущаяДата = new Date().toISOString();
      const ответ = await todoService.create({
        title: название.trim(),
        completed: false,
        createdAt: текущаяДата,
        userId: 1,
        tagIds: [],
      });
      задачи.value.push(преобразоватьЗадачу(ответ));
    } catch (значениеОшибки) {
      ошибка.value = получитьСообщениеОшибки(значениеОшибки, 'Не удалось создать задачу');
    } finally {
      загрузка.value = false;
    }
  };

  const обновитьЗадачу = async (запрос: ОбновитьЗадачуЗапрос): Promise<void> => {
    загрузка.value = true;
    ошибка.value = null;

    try {
      const ответ = await todoService.update(запрос.идентификатор, { title: запрос.название });
      const задача = задачи.value.find((элемент) => элемент.идентификатор === ответ.id);

      if (задача) {
        задача.название = ответ.title;
      }
    } catch (значениеОшибки) {
      ошибка.value = получитьСообщениеОшибки(значениеОшибки, 'Не удалось обновить задачу');
    } finally {
      загрузка.value = false;
    }
  };

  const переключитьЗадачу = async (идентификатор: number): Promise<void> => {
    const задача = задачи.value.find((элемент) => элемент.идентификатор === идентификатор);

    if (!задача) {
      return;
    }

    загрузка.value = true;
    ошибка.value = null;

    try {
      const ответ = await todoService.update(идентификатор, { completed: !задача.выполнена });
      задача.выполнена = ответ.completed;
    } catch (значениеОшибки) {
      ошибка.value = получитьСообщениеОшибки(значениеОшибки, 'Не удалось обновить задачу');
    } finally {
      загрузка.value = false;
    }
  };

  const удалитьЗадачу = async (идентификатор: number): Promise<void> => {
    загрузка.value = true;
    ошибка.value = null;

    try {
      await todoService.delete(идентификатор);
      задачи.value = задачи.value.filter((элемент) => элемент.идентификатор !== идентификатор);
    } catch (значениеОшибки) {
      ошибка.value = получитьСообщениеОшибки(значениеОшибки, 'Не удалось удалить задачу');
    } finally {
      загрузка.value = false;
    }
  };

  const установитьФильтр = (новыйФильтр: ТипФильтраЗадач): void => {
    фильтр.value = новыйФильтр;
  };

  const установитьПоиск = (новыйПоиск: string): void => {
    поиск.value = новыйПоиск;
  };

  return {
    отфильтрованныеЗадачи,
    текущийФильтр,
    текущийПоиск,
    загружается,
    текущаяОшибка,
    добавитьЗадачу,
    обновитьЗадачу,
    переключитьЗадачу,
    удалитьЗадачу,
    установитьФильтр,
    установитьПоиск,
    загрузитьЗадачи,
  };
});


