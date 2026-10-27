<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { записатьОшибка } from '@/utils/errorHandling';

const обработатьНеобработаннуюОшибку = (событие: PromiseRejectionEvent): void => {
  записатьОшибка(событие.reason);
};

const обработатьОшибкаОкна = (событие: ErrorEvent): void => {
  записатьОшибка(событие.error ?? событие.message);
};

onMounted((): void => {
  window.addEventListener('unhandledrejection', обработатьНеобработаннуюОшибку);
  window.addEventListener('error', обработатьОшибкаОкна);
});

onUnmounted((): void => {
  window.removeEventListener('unhandledrejection', обработатьНеобработаннуюОшибку);
  window.removeEventListener('error', обработатьОшибкаОкна);
});
</script>

