const baseUrlPlugin = defineNuxtPlugin((app) => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.apiBaseUrl ?? config.public.apiBaseUrl;

  return {
    provide: {
      apiBaseUrl,
    },
  };
});

export default baseUrlPlugin;
