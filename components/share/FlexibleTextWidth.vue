<template>
  <p :style="{ fontSize: computedFontSize }" :class="class">
    {{ text }}
  </p>
</template>

<script lang="ts" setup>
const props = defineProps({
  class: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    required: true,
  },
  maxLength: {
    // max text length
    type: Number,
    default: 20, // char
  },
  minLength: {
    // min text length
    type: Number,
    default: 10, // char
  },
  minSize: {
    // text size min can accept > 12px
    type: Number,
    default: 1, // rem
  },
  maxSize: {
    // text size max can accept
    type: Number,
    default: 2, // rem
  },
});

const computedFontSize = computed(() => {
  const length = props.text.length;

  if (length < 10) {
    return `${props.maxSize}rem`; // text size for text < 10 char
  } else if (length < props.maxLength) {
    return `${
      props.maxSize -
      ((length - 10) / (props.maxLength - 10)) * (props.maxSize - props.minSize)
    }rem`;
  } else {
    return `${props.minSize}rem`; // text size for text > max char
  }
});
</script>

<style scoped>
/* Bạn có thể thêm các kiểu khác cho component ở đây */
</style>
