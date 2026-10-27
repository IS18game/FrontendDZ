<template>
  <q-form class="row q-col-gutter-sm" @submit.prevent="отправить">
    <div class="col">
      <q-input
        v-model="значения.название"
        outlined
        label="Название задачи"
        :error="Boolean(ошибки.название)"
        @update:model-value="проверитьПоле('название')"
      />
      <FormError :сообщение="ошибки.название" />
    </div>
    <div class="col-auto">
      <q-btn type="submit" color="primary" label="Добавить" :disable="!значения.название.trim()" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import FormError from '@/components/FormError.vue';
import { useValidation } from '@/composables/useValidation';
import { нормализоватьЗначениеФормы } from '@/utils/formHelpers';
import { правилоНазванияЗадачи } from '@/utils/validation';

const emit = defineEmits<{
  add: [название: string];
}>();

const значения = reactive({ название: '' });
const { ошибки, проверить, проверитьПоле } = useValidation(значения, {
  название: [правилоНазванияЗадачи],
});

const отправить = (): void => {
  if (!проверить()) {
    return;
  }

  emit('add', нормализоватьЗначениеФормы(значения.название));
  значения.название = '';
};
</script>
