<template>
  <q-page class="q-pa-md">
    <h1 class="text-h5 q-mt-none">Настройки</h1>
    <q-toggle
      :model-value="хранилищеПользователя.текущиеНастройки.компактныйРежим"
      label="Компактный режим"
      @update:model-value="изменитьКомпактныйРежим"
    />
    <q-btn class="q-mt-md" color="negative" label="Выйти" @click="выйти" />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { именаМаршрутов } from '@/types';

const router = useRouter();
const хранилищеПользователя = useUserStore();

const изменитьКомпактныйРежим = (компактныйРежим: boolean): void => {
  хранилищеПользователя.обновитьНастройки({ компактныйРежим });
};

const выйти = async (): Promise<void> => {
  хранилищеПользователя.выйти();
  await router.push({ name: именаМаршрутов.вход });
};
</script>
