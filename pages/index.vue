<template>
  <div class="flex-1 flex justify-center items-center">
    <div class="space-y-8">
      <div class="space-y-4">
        <h1 class="font-bold text-3xl text-center">
          Эффективный инструмент для работы со страхами и тревогами
        </h1>
        <p class="text-center">Онлайн-помощник для ведения журнала настроения из когнитивно-поведенческой терапии (КПТ)
        </p>
      </div>
      <div v-if="!user" class="flex justify-center gap-4">
        <NuxtLink to="/about">
          <UButton size="xl" variant="soft">О приложении</UButton>
        </NuxtLink>
      </div>
      <div v-else class="flex justify-center gap-4">
        <NuxtLink to="/app">
          <UButton size="xl">Перейти в приложение</UButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
</script>