<template>
  <header class="flex justify-between items-center mt-10">
    <NuxtLink to="/" class="text-xl font-bold">КПТ Журнал</NuxtLink>
    <div class="flex gap-8 items-center">
      <nav class="space-x-4">
        <NuxtLink to="/about">Инструкция</NuxtLink>
        <NuxtLink to="/about">О приложении</NuxtLink>
      </nav>
      <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" icon="i-heroicons-photo" alt="Avatar" />
    </div>
  </header>
</template>