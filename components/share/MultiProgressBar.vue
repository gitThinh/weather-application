<template>
  <div class="flex gap-1">
    <div v-for="(percentage, index) in percentages" :key="index" class="w-full">
      <p
        class="text-sm text-neutral-500"
        :class="show === 'status' ? 'text-center' : 'text-end'"
      >
        {{ getDisplayValue(index) }}
      </p>
      <div class="h-2 bg-gray-200 rounded">
        <div
          class="h-full bg-blue-500 rounded"
          :style="{ width: percentage + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  ranges: {
    type: Array as () => { max: number; status: string }[],
    required: true,
  },
  show: {
    type: String as () => "status" | "none" | "range",
    default: "range",
  },
});

// Calculate percentage for each progress bars
const percentages = computed(() => {
  const percentages: number[] = [];
  let remaining = props.total;
  let rangeSuccess = 0;

  for (const range of props.ranges) {
    const limit = range.max; // max range of each bars

    if (remaining >= limit - rangeSuccess) {
      percentages.push(100); // Full
      remaining -= limit - rangeSuccess; // minus bar range
      rangeSuccess = limit;
    } else {
      percentages.push((remaining / (limit - rangeSuccess)) * 100); // Percentage of the remaining
      break;
    }
  }

  // Make sure there are enough bars
  while (percentages.length < props.ranges.length) {
    percentages.push(0);
  }

  return percentages;
});

const getDisplayValue = (index: number) => {
  if (props.show === "status") {
    return props.ranges[index]?.status || ""; // status
  } else if (props.show === "range") {
    if (props.ranges[props.ranges.length - 1].max !== 100 && index === props.ranges.length - 1) {
      return `+${props.ranges[index]?.max}`;
    }
    return props.ranges[index]?.max || "";
  }
  return ""; // none
};
</script>

<style scoped>
/* Thêm CSS cho thanh progress nếu cần */
</style>
