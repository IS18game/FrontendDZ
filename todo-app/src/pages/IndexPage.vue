<template>
  <q-page class="q-pa-md">
    <h1 class="text-h5 q-mt-none">Список задач</h1>
    <q-banner v-if="хранилищеЗадач.текущаяОшибка" class="q-mb-md" rounded inline-actions dense>
      {{ хранилищеЗадач.текущаяОшибка.сообщение }}
      <template #action>
        <q-btn flat label="Повторить" @click="загрузить" />
      </template>
    </q-banner>
    <TodoForm class="q-mb-md" @add="хранилищеЗадач.добавитьЗадачу" />
    <q-input v-model="поиск" class="q-mb-md" outlined label="Поиск задач" />
    <q-btn-toggle
      v-model="фильтр"
      class="q-mb-md"
      color="primary"
      toggle-color="primary"
      text-color="dark"
      toggle-text-color="dark"
      :options="параметрыФильтра"
    />
    <q-inner-loading :showing="хранилищеЗадач.загружается" />
    <TodoList
      :задачи="отфильтрованныеЗадачи"
      @toggle="хранилищеЗадач.переключитьЗадачу"
      @delete="хранилищеЗадач.удалитьЗадачу"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TodoForm from '@/components/TodoForm.vue';
import TodoList from '@/components/TodoList.vue';
import { useTodoFilter } from '@/composables/useTodoFilter';
import { useTodoStore } from '@/stores/todoStore';
import type { ТипФильтраЗадач } from '@/types';

const хранилищеЗадач = useTodoStore();
const { фильтр, поиск, отфильтрованныеЗадачи } = useTodoFilter();
const параметрыФильтра: { label: string; value: ТипФильтраЗадач }[] = [
  { label: 'Все', value: 'все' },
  { label: 'Активные', value: 'активные' },
  { label: 'Выполненные', value: 'выполненные' },
];

const загрузить = (): void => {
  void хранилищеЗадач.загрузитьЗадачи();
};

onMounted((): void => {
  загрузить();
});
</script>
