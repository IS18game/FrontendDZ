<template>
  <q-item :class="{ 'opacity-50': todo.выполнена }">
    <q-item-section side>
      <q-checkbox :model-value="todo.выполнена" @update:model-value="переключить" />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strike': todo.выполнена }">{{ todo.название }}</q-item-label>
      <q-item-label caption>{{ датаСоздания }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn flat round color="negative" icon="delete" aria-label="Удалить" @click="удалить" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ITodoItem } from '@/types/todo';

const props = defineProps<{
  todo: ITodoItem;
}>();

const emit = defineEmits<{
  toggle: [идентификатор: number];
  delete: [идентификатор: number];
}>();

const датаСоздания = computed<string>(() => new Intl.DateTimeFormat('en-GB').format(new Date(props.todo.датаСоздания)));

const переключить = (): void => {
  emit('toggle', props.todo.идентификатор);
};

const удалить = (): void => {
  emit('delete', props.todo.идентификатор);
};
</script>
