<template>
  <div class="flex-1 flex justify-center items-center">
    <UCard class="w-full max-w-xl">
      <div class="mb-4 space-y-2">
        <h1 class="font-semibold text-xl">Войдите в свой аккаунт</h1>
        <h2 class="text-sm ">Или <NuxtLink to="/signup" class="underline font-semibold">создайте новый
          </NuxtLink>
        </h2>
      </div>
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
    navigateTo('/app')
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
