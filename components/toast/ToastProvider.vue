<template>
  <div class="fixed right-5 top-12 z-50 space-y-2 w-1/6">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="rounded-lg bg-neutral-100 p-4 shadow-md transition-transform duration-300 ease-in-out dark:bg-neutral-800"
      :class="{
        'border border-green-500': toast.type === 'success',
        'border border-yellow-500': toast.type === 'warning',
        'border border-red-500': toast.type === 'error',
        'border border-blue-500': toast.type === 'info',
      }"
    >
      <div class="flex items-center justify-between">
        <div class="flex flex-row gap-4">
          <ToastIcon :type="toast.type" />
          <span class="font-medium">{{ toast.message }}</span>
        </div>
        <button @click="clearToast(toast.id)" class="w-max flex items-center">
          <NuxtIcon name="radix-icons:cross-2" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useToast from "~/composables/useToast";

const { toasts, clearToast } = useToast();
</script>
