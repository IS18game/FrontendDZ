import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoForm from '@/components/TodoForm.vue';

describe('TodoForm', () => {
  it('does not submit an empty task', async () => {
    const wrapper = mount(TodoForm, {
      global: {
        stubs: {
          'q-form': { template: '<form @submit="$emit(\'submit\', $event)"><slot /></form>', emits: ['submit'] },
          'q-input': { template: '<input />' },
          'q-btn': { template: '<button type="submit"><slot /></button>' },
        },
      },
    });
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('add')).toBeUndefined();
  });

  it('submits a trimmed task name', async () => {
    const wrapper = mount(TodoForm, {
      global: {
        stubs: {
          'q-form': { template: '<form @submit="$emit(\'submit\', $event)"><slot /></form>', emits: ['submit'] },
          'q-input': {
            props: ['modelValue'],
            emits: ['update:modelValue'],
            template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
          },
          'q-btn': { template: '<button type="submit"><slot /></button>' },
        },
      },
    });
    await wrapper.find('input').setValue('  Новая задача  ');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.emitted('add')).toEqual([['Новая задача']]);
  });
});
