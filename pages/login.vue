<template>
  <div class="mx-auto max-w-xl space-y-4">
    <h2 class="font-bold text-xl">Добро пожаловать в КПТ Ассистент</h2>
    <div>Для использования приложения нужно прочитать книгу Эрика Бернса "Терапия беспокойства"
      <div class="flex justify-center">
        <NuxtImg src="/images/64476057.webp" class="border m-4"></NuxtImg>
      </div>
      <div class="space-y-4">
        <h1 class="font-semibold text-xl">Авторизация</h1>
        <UForm :state="state" :schema="schema" @submit="signInWithPassword" class="space-y-4">
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>
          <UFormGroup label="Пароль" name="password">
            <UInput v-model="state.password" type="password" />
          </UFormGroup>
          <UButton type="submit" :loading="isLoading">
            Войти
          </UButton>
        </UForm>
      </div>
    </div>
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

const schema = z.object({
  email: z.string().email('Неверно введён email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

const signInWithPassword = async () => {
  isLoading.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: state.value.email,
      password: state.value.password
    })
    if (error) throw error
    toastSuccess({ title: 'Вы успешно авторизованы' })
    navigateTo('/')
  } catch (e) {
    toastError({
      title: 'Ошибка при авторизации',
      description: e.message
    })
  } finally {
    isLoading.value = false
  }
}
</script>
