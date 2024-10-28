<template>
  <div class="flex items-center gap-2">
    <NuxtImg src="/icons/doC.png" class="w-4 object-cover" />
    <HeadlessSwitch
      v-model="convertUnit"
      :class="convertUnit ? 'bg-info-dark' : 'bg-info-normal'"
      class="relative inline-flex h-5 w-9 items-center rounded-full"
    >
      <span class="sr-only">Switch units</span>
      <span
        :class="convertUnit ? 'translate-x-1' : 'translate-x-5'"
        class="inline-block h-3 w-3 transform rounded-full bg-white transition"
      ></span>
    </HeadlessSwitch>
    <NuxtImg src="/icons/doF.png" class="w-4 object-cover" />
  </div>
</template>

<script lang="ts" setup>
const { unit, handleChangeUnits } = useUnitsTemp();

// computed
const convertUnit = computed({
  get: () => unit.value === "metric",
  set: handleChangeUnits
})
</script>
