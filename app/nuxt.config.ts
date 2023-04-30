// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiBaseUrl: "http://api:4000",
    public: {
      apiBaseUrl: "http://localhost:4000",
    },
  },
});
