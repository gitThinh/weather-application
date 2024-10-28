<template>
    <NuxtIcon :name="iconName" :class="iconClass" class="w-6 h-6" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  type: "success" | "warning" | "error" | "info";
}>()

const iconMapping = {
  success: 'radix-icons:check-circled',
  warning: 'radix-icons:exclamation-triangle',
  error: 'radix-icons:cross-circled',
  info: 'radix-icons:info-circled',
};

const iconClassMapping = {
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
  info: 'text-blue-500',
};

const iconName = iconMapping[props.type];
const iconClass = iconClassMapping[props.type];
</script>