import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';
import type { ITodoItem } from '@/types';

const задача: ITodoItem = {
  идентификатор: 1,
  название: 'Изучить Vue',
  выполнена: false,
  датаСоздания: '2026-01-01T00:00:00.000Z',
};

describe('TodoItem', () => {
  it('renders task title and date', () => {
    const wrapper = mount(TodoItem, {
      props: { todo: задача },
      global: {
        stubs: {
          'q-item': { template: '<div><slot /></div>' },
          'q-item-section': { template: '<div><slot /></div>' },
          'q-item-label': { template: '<div><slot /></div>' },
          'q-checkbox': { template: '<button />' },
          'q-btn': { template: '<button><slot /></button>' },
        },
      },
    });
    expect(wrapper.text()).toContain('Изучить Vue');
    expect(wrapper.text()).toContain('01/01/2026');
  });

  it('emits toggle and delete with the task id', async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: задача },
      global: {
        stubs: {
          'q-item': { template: '<div><slot /></div>' },
          'q-item-section': { template: '<div><slot /></div>' },
          'q-item-label': { template: '<div><slot /></div>' },
          'q-checkbox': { emits: ['update:modelValue'], template: '<button @click="$emit(\'update:modelValue\', true)" />' },
          'q-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>', emits: ['click'] },
        },
      },
    });
    const кнопки = wrapper.findAll('button');
    await кнопки[0]?.trigger('click');
    await кнопки[1]?.trigger('click');
    expect(wrapper.emitted('toggle')).toEqual([[1]]);
    expect(wrapper.emitted('delete')).toEqual([[1]]);
  });
});

