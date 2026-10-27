<template>
  <q-page class="row items-center justify-center q-pa-md">
    <q-card class="col-12 col-sm-6 col-md-4">
      <q-card-section>
        <div class="text-h6">Вход</div>
        <div v-if="демо" class="text-caption">Демонстрационный режим: используйте любой email и пароль от 6 символов. Данные хранятся в этом браузере.</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="войти">
          <q-input
            v-model="значения.email"
            outlined
            label="Email"
            type="email"
            :error="Boolean(ошибки.email)"
            @update:model-value="проверитьПоле('email')"
          />
          <FormError :сообщение="ошибки.email" />
          <q-input
            v-model="значения.пароль"
            class="q-mt-md"
            outlined
            label="Пароль"
            type="password"
            :error="Boolean(ошибки.пароль)"
            @update:model-value="проверитьПоле('пароль')"
          />
          <FormError :сообщение="ошибки.пароль" />
          <FormError :сообщение="ошибка" />
          <q-btn class="full-width q-mt-md" color="primary" type="submit" label="Войти" :loading="хранилищеПользователя.пользовательЗагружается" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormError from '@/components/FormError.vue';
import { useErrorHandler } from '@/composables/useErrorHandler';
import { useValidation } from '@/composables/useValidation';
import { useUserStore } from '@/stores/userStore';
import { правилоEmail, правилоПароля } from '@/utils/validation';

const router = useRouter();
const демо = import.meta.env.PROD;
const маршрут = useRoute();
const хранилищеПользователя = useUserStore();
const значения = reactive({ email: '', пароль: '' });
const { ошибки, проверить, проверитьПоле } = useValidation(значения, {
  email: [правилоEmail],
  пароль: [правилоПароля],
});
const обработчикОшибки = useErrorHandler();
const ошибка = computed<string>(() => обработчикОшибки.ошибка.value);
const путьПослеВхода = computed<string>(() =>
  typeof маршрут.query.redirect === 'string' ? маршрут.query.redirect : '/',
);

const войти = async (): Promise<void> => {
  if (!проверить()) {
    return;
  }

  обработчикОшибки.очистить();

  try {
    await хранилищеПользователя.войти(значения.email);
    await router.push(путьПослеВхода.value);
  } catch (значениеОшибки) {
    обработчикОшибки.обработать(значениеОшибки, 'Не удалось выполнить вход. Проверьте данные и попробуйте ещё раз.');
  }
};
</script>
