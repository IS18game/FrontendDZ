import { apiClient } from './apiClient';
import type { IApiTodo } from './types';

export const todoService = {
  getAll: async (сигнал?: AbortSignal): Promise<IApiTodo[]> => apiClient.get<IApiTodo[]>('/todos', сигнал),
  create: async (данные: Omit<IApiTodo, 'id'>, сигнал?: AbortSignal): Promise<IApiTodo> =>
    apiClient.post<IApiTodo, Omit<IApiTodo, 'id'>>('/todos', данные, сигнал),
  update: async (идентификатор: number, данные: Partial<IApiTodo>, сигнал?: AbortSignal): Promise<IApiTodo> =>
    apiClient.patch<IApiTodo, Partial<IApiTodo>>(`/todos/${идентификатор}`, данные, сигнал),
  delete: async (идентификатор: number, сигнал?: AbortSignal): Promise<void> =>
    apiClient.delete(`/todos/${идентификатор}`, сигнал),
};
