<template>
  <NuxtLayout>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </NuxtLayout>
  <UNotifications />
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'ru'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/icons8-psychology-32.png'
    }
  ]
})
</script>