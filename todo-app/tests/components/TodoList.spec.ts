import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';
import type { ITodoItem } from '@/types';

const задачи: ITodoItem[] = [
  { идентификатор: 1, название: 'Первая', выполнена: false, датаСоздания: '2026-01-01T00:00:00.000Z' },
  { идентификатор: 2, название: 'Вторая', выполнена: true, датаСоздания: '2026-01-02T00:00:00.000Z' },
];

describe('TodoList', () => {
  it('renders all tasks and an empty state', () => {
    const wrapper = mount(TodoList, {
      props: { задачи },
      global: {
        stubs: {
          TodoItem: { props: ['todo'], template: '<div>{{ todo.название }}</div>' },
          transition: false,
          'q-list': { template: '<div><slot /></div>' },
          'q-item': { template: '<div><slot /></div>' },
          'q-item-section': { template: '<div><slot /></div>' },
          'q-item-label': { template: '<div><slot /></div>' },
        },
      },
    });
    expect(wrapper.text()).toContain('Первая');
    expect(wrapper.text()).toContain('Вторая');
  });

  it('shows an empty state when there are no tasks', () => {
    const wrapper = mount(TodoList, {
      props: { задачи: [] },
      global: {
        stubs: {
          TodoItem: true,
          'q-list': { template: '<div><slot /></div>' },
          'q-item': { template: '<div><slot /></div>' },
          'q-item-section': { template: '<div><slot /></div>' },
          'q-item-label': { template: '<div><slot /></div>' },
        },
      },
    });
    expect(wrapper.text()).toContain('Задач пока нет');
  });
});
