<template>
  <div class="flex flex-col" :class="class">
    <button class="px-3 py-1.5" :class="btnClass" @click="handleShowError">
      show error
    </button>
    <button class="px-3 py-1.5" :class="btnClass" @click="handleShowSuccess">
      show success
    </button>
    <button class="px-3 py-1.5" :class="btnClass" @click="handleShowInfo">
      show info
    </button>
    <button class="px-3 py-1.5" :class="btnClass" @click="handleShowWarning">
      show warning
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  btnClass?: string;
  class?: string;
}>();
const { showToast } = useToast();
const handleShowError = () => {
  showToast("error", "lỗi rồi");
};
const handleShowSuccess = () => {
  showToast("success", "thành công");
};
const handleShowWarning = () => {
  showToast("warning", "cảnh báo");
};
const handleShowInfo = () => {
  showToast("info", "Thông báo");
};
</script>
