<template>
  <section class="mt-8 space-y-4">
    <UButton v-if="user" size="xs" icon="heroicons-arrow-left" variant="soft">
      <NuxtLink to="/app">Вернуться в приложение</NuxtLink>
    </UButton>
    <h1 class="text-xl font-bold">О приложении</h1>
    <p>КПТ Дневник разработан на основе книги Дэвида Бернса "Терапия
      беспокойства".</p>
    <p>Настоятельно рекомендуется приобрести и прочитать данную книгу полностью, чтобы правильно и эффективно работать
      с
      представленными
      инструментами и получить все разъяснения.</p>
    <p>Сейчас в приложении доступно заполнение журнала и опросника настроения.</p>
    <div class="flex justify-center">
      <NuxtImg src="/images/64476057.webp" class="shadow-xl" />
    </div>
  </section>
</template>

<script setup>
const user = useSupabaseUser()
</script>