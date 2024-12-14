<template>
  <div class="flex-1 flex justify-center items-center">
    <UCard class="w-full max-w-xl">
      <div class="mb-4 space-y-2">
        <h1 class="font-semibold text-xl">Создайте новый аккаунт</h1>
        <h2 class="text-sm">Или <NuxtLink to="/login" class="underline font-semibold">войдите в существующий</NuxtLink>
        </h2>
      </div>
      <UForm :state="state" :schema="schema" class="space-y-4" @submit="signUpWithPassword">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Пароль" name="passwordForm.password">
          <UInput v-model="state.passwordForm.password" type="password" />
        </UFormGroup>
        <UFormGroup label="Подтверждение пароля" name="passwordForm.confirm">
          <UInput v-model="state.passwordForm.confirm" type="password" />
        </UFormGroup>
        <UButton type="submit" :loading="isLoading">
          Регистрация
        </UButton>
      </UForm>
    </UCard>

  </div>
</template>

<script setup>
import { z } from 'zod'
const supabase = useSupabaseClient()
const { toastSuccess, toastError } = useAppToast()
const isLoading = ref(false)
const state = ref({
  email: undefined,
  passwordForm: {
    password: undefined,
    confirm: undefined
  },
})

useSeoMeta({
  title: "Регистрация"
})

const schema = z.object({
  email: z.string().email('Неверно введён email'),
  passwordForm: z
    .object({
      password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
      confirm: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Пароли не совпадают!",
      path: ["confirm"],
    })
})

const signUpWithPassword = async () => {
  isLoading.value = true
  try {
    const { error } = await supabase.auth.signUp({
      email: state.value.email,
      password: state.value.passwordForm.password
    })
    if (error) throw error
    toastSuccess({ title: 'Вы успешно создали новый аккаунт' })
    navigateTo('/login')
  } catch (e) {
    toastError({
      title: 'Ошибка при регистрации',
      description: e.message
    })
  } finally {
    isLoading.value = false
  }
}
</script>
