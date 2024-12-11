<template>
  <header class="flex justify-between items-center mt-6">
    <NuxtLink to="/" class="text-2xl font-semibold">КПТ <span class="text-primary">Дневник</span>
    </NuxtLink>
    <div class="flex justify-between items-center gap-2">
      <div class="font-mono">
        <UButton v-if="!user" variant="soft">
          <NuxtLink to="/login">Войти</NuxtLink>
        </UButton>
      </div>
      <UDropdown v-if="user" :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }"
        :popper="{ placement: 'bottom-start' }">
        <UAvatar src="https://avatar.iran.liara.run/public" icon="i-heroicons-photo" alt="Avatar" />
        <template #account>
          <div class="text-left">
            <p>
              Вы вошли как
            </p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ user.email }}
            </p>
          </div>
        </template>
        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>
          <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
        </template>
      </UDropdown>
    </div>
  </header>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { toastSuccess, toastError } = useAppToast()
const route = useRoute();
const items = [
  [{
    slot: 'account',
    disabled: true
  }], [{
    label: 'Настройки',
    icon: 'i-heroicons-cog-8-tooth',
    click: () => toastSuccess({ title: 'Настройки будут доступны позднее' })
  }, {
    label: 'Выйти',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    click: async () => {
      await supabase.auth.signOut()
      toastSuccess({ title: 'Вы успешно вышли из аккаунта' })
      return navigateTo('/login')
    }
  }]
]

</script>
