<template>
  <slot></slot>
  <ToastProvider />
</template>

<script lang="ts" setup>
const {locale} = useI18n();
useHead({
  htmlAttrs: {
    lang: locale,
  }
})

</script>
