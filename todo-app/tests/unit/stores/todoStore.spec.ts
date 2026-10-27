import { describe, expect, it, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useTodoStore } from '@/stores/todoStore';
import type { IApiTodo } from '@/services/types';

const { mockGetAll, mockCreate, mockUpdate, mockDelete } = vi.hoisted(() => ({
  mockGetAll: vi.fn<() => Promise<IApiTodo[]>>(),
  mockCreate: vi.fn(),
  mockUpdate: vi.fn(),
  mockDelete: vi.fn(),
}));

vi.mock('@/services/todoService', () => ({
  todoService: {
    getAll: mockGetAll,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete,
  },
}));

describe('todoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('loads tasks through the service', async () => {
    mockGetAll.mockResolvedValue([
      { id: 1, title: 'Тест', completed: false, createdAt: '2026-01-01T00:00:00.000Z', userId: 1, tagIds: [] },
    ]);
    const store = useTodoStore();
    await store.загрузитьЗадачи();
    expect(store.отфильтрованныеЗадачи[0]?.название).toBe('Тест');
    expect(store.загружается).toBe(false);
  });

  it('stores a user-facing error when loading fails', async () => {
    mockGetAll.mockRejectedValue(new Error('network'));
    const store = useTodoStore();
    await store.загрузитьЗадачи();
    expect(store.текущаяОшибка?.сообщение).toBe('Не удалось загрузить задачи');
  });

  it('creates, updates, toggles, and deletes tasks through actions', async () => {
    const store = useTodoStore();
    mockCreate.mockResolvedValue({ id: 2, title: 'Новая', completed: false, createdAt: '2026-01-01T00:00:00.000Z', userId: 1, tagIds: [] });
    mockUpdate.mockResolvedValue({ id: 2, title: 'Готово', completed: true, createdAt: '2026-01-01T00:00:00.000Z', userId: 1, tagIds: [] });
    mockDelete.mockResolvedValue(undefined);
    await store.добавитьЗадачу('Новая');
    await store.обновитьЗадачу({ идентификатор: 2, название: 'Готово' });
    await store.переключитьЗадачу(2);
    await store.удалитьЗадачу(2);
    expect(mockCreate).toHaveBeenCalledOnce();
    expect(mockUpdate).toHaveBeenCalled();
    expect(mockDelete).toHaveBeenCalledWith(2);
  });
});

