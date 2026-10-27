<template>
  <q-list bordered separator>
    <q-item v-if="!задачи.length">
      <q-item-section>
        <q-item-label>Задач пока нет</q-item-label>
      </q-item-section>
    </q-item>
    <transition-group name="q-transition--fade" tag="div">
      <TodoItem
        v-for="задача in задачи"
        :key="задача.идентификатор"
        :todo="задача"
        @toggle="emit('toggle', $event)"
        @delete="emit('delete', $event)"
      />
    </transition-group>
  </q-list>
</template>

<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import type { ITodoItem } from '@/types/todo';

defineProps<{
  задачи: ITodoItem[];
}>();

const emit = defineEmits<{
  toggle: [идентификатор: number];
  delete: [идентификатор: number];
}>();
</script>
