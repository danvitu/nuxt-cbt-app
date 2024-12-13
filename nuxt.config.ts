// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "@nuxt/image", "@nuxtjs/seo"],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: "/login",
      callback: "",
      exclude: ["/", "/signup", "/about"],
    },
  },
  site: {
    url: process.env.BASE_URL,
    name: "КПТ Дневник",
    description: "Эффективный инструмент для работы со страхами и тревогами",
    defaultLocale: "ru",
  },
  robots: {
    disallow: ["/app"],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
    },
  },
})
