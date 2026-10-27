<template>
  <div v-if="сообщение" class="text-negative text-caption q-mt-xs" role="alert">
    {{ сообщение }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  сообщение?: string;
}>();
</script>
