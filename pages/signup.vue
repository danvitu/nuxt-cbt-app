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
        <UFormGroup label="Пароль" name="password">
          <UInput v-model="state.password" type="password" />
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
  password: undefined
})

useSeoMeta({
  title: "Регистрация"
})

const schema = z.object({
  email: z.string().email('Неверно введён email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

const signUpWithPassword = async () => {
  isLoading.value = true
  try {
    const { error } = await supabase.auth.signUp({
      email: state.value.email,
      password: state.value.password
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
