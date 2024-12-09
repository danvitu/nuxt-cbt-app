<template>
  <h1 class="font-bold text-center p-4">Приложение-ассистент для работы с книгой Дэвида Бернса "Терапия
    беспокойства"
  </h1>
  <div class="flex justify-center mb-8">
    <NuxtImg src="/images/64476057.webp" class="border" />
  </div>
  <div class="flex justify-center gap-4 mb-4">
    <NuxtLink to="/login">
      <UButton size="xl" variant="soft">Войти</UButton>
    </NuxtLink>
    <NuxtLink to="/signup">
      <UButton size="xl" variant="solid">Зарегистрироваться</UButton>
    </NuxtLink>
  </div>
</template>

<script setup>
</script>