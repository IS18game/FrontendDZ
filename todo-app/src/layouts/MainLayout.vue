<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Меню" @click="хранилищеИнтерфейса.переключитьПанель" />
        <q-toolbar-title>Список задач</q-toolbar-title>
        <q-btn
          flat
          round
          :icon="хранилищеИнтерфейса.темнаяТема ? 'light_mode' : 'dark_mode'"
          aria-label="Переключить тему"
          @click="хранилищеИнтерфейса.переключитьТему"
        />
      </q-toolbar>
      <q-breadcrumbs class="q-px-md q-pb-sm" active-color="white">
        <q-breadcrumbs-el
          v-for="крошка in хлебныеКрошки"
          :key="крошка.метка"
          :label="крошка.метка"
          :to="крошка.путь"
        />
      </q-breadcrumbs>
    </q-header>

    <q-drawer
      :model-value="хранилищеИнтерфейса.панельВидима"
      show-if-above
      bordered
      @update:model-value="хранилищеИнтерфейса.установитьВидимостьПанели"
    >
      <q-list>
        <q-item-label header>Навигация</q-item-label>
        <q-item clickable to="/">
          <q-item-section>Задачи</q-item-section>
        </q-item>
        <q-item clickable to="/settings">
          <q-item-section>Настройки</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUiStore } from '@/stores/uiStore';

interface IХлебнаяКрошка {
  метка: string;
  путь: string;
}

const маршрут = useRoute();
const хранилищеИнтерфейса = useUiStore();
const хлебныеКрошки = computed<IХлебнаяКрошка[]>(() =>
  маршрут.matched
    .filter((запись) => Boolean(запись.meta.хлебнаяКрошка))
    .map((запись) => ({
      метка: запись.meta.хлебнаяКрошка ?? '',
      путь: запись.path,
    })),
);

onMounted((): void => {
  хранилищеИнтерфейса.применитьТему();
});
</script>
