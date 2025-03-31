// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxt/eslint",
    "@vite-pwa/nuxt",
  ],
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "КПТ-дневник",
      short_name: "КПТ-дневник",
      theme_color: "#ffffff",
      icons: [
        {
          src: "icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
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
    disallow: ["/app", "/app/*"],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
    },
  },
});
