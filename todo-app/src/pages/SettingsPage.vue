<template>
  <q-page class="q-pa-md">
    <h1 class="text-h5 q-mt-none">Настройки</h1>
    <q-btn class="q-mt-md" color="negative" label="Выйти" @click="выйти" />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { именаМаршрутов } from '@/types';

const router = useRouter();
const хранилищеПользователя = useUserStore();

const выйти = async (): Promise<void> => {
  хранилищеПользователя.выйти();
  await router.push({ name: именаМаршрутов.вход });
};
</script>
