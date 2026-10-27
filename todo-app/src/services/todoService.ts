import { apiClient } from './apiClient';
import type { IApiTodo } from './types';

const ключДемоЗадач = 'demo-todos';
const демо = import.meta.env.PROD;
const прочитатьЗадачи = (): IApiTodo[] => {
  const сохранено = localStorage.getItem(ключДемоЗадач);
  return сохранено ? (JSON.parse(сохранено) as IApiTodo[]) : [];
};
const сохранитьЗадачи = (задачи: IApiTodo[]): void => {
  localStorage.setItem(ключДемоЗадач, JSON.stringify(задачи));
};

export const todoService = {
  getAll: async (сигнал?: AbortSignal): Promise<IApiTodo[]> => демо ? прочитатьЗадачи() : apiClient.get<IApiTodo[]>('/todos', сигнал),
  create: async (данные: Omit<IApiTodo, 'id'>, сигнал?: AbortSignal): Promise<IApiTodo> =>
    демо ? (() => {
      const задачи = прочитатьЗадачи();
      const задача = { ...данные, id: Math.max(0, ...задачи.map((элемент) => элемент.id)) + 1 };
      сохранитьЗадачи([...задачи, задача]);
      return задача;
    })() : apiClient.post<IApiTodo, Omit<IApiTodo, 'id'>>('/todos', данные, сигнал),
  update: async (идентификатор: number, данные: Partial<IApiTodo>, сигнал?: AbortSignal): Promise<IApiTodo> =>
    демо ? (() => {
      const задачи = прочитатьЗадачи();
      const задача = задачи.find((элемент) => элемент.id === идентификатор);
      if (!задача) throw new Error('Задача не найдена');
      const обновленная = { ...задача, ...данные, id: идентификатор };
      сохранитьЗадачи(задачи.map((элемент) => элемент.id === идентификатор ? обновленная : элемент));
      return обновленная;
    })() : apiClient.patch<IApiTodo, Partial<IApiTodo>>(`/todos/${идентификатор}`, данные, сигнал),
  delete: async (идентификатор: number, сигнал?: AbortSignal): Promise<void> => {
    if (демо) {
      сохранитьЗадачи(прочитатьЗадачи().filter((задача) => задача.id !== идентификатор));
      return;
    }
    await apiClient.delete(`/todos/${идентификатор}`, сигнал);
  },
};
