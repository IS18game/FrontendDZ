<template>
  <q-page class="row items-center justify-center q-pa-md">
    <div class="text-center">
      <div class="text-h4">404</div>
      <div class="text-subtitle1 q-mt-sm">Страница не найдена</div>
      <q-btn class="q-mt-md" color="primary" label="На главную" @click="перейтиНаГлавную" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { именаМаршрутов } from '@/types';

const router = useRouter();

const перейтиНаГлавную = async (): Promise<void> => {
  await router.push({ name: именаМаршрутов.главная });
};
</script>
