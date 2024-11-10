import { ref, onMounted, onBeforeUnmount } from 'vue';

export function randomNumberPerTime(min = 0, max = 100, time = 1000) {
  const randomNumber = ref<number>(0);

  const generateRandomNumber = () => {
    randomNumber.value = Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let intervalId: ReturnType<typeof setInterval> | undefined;

  onMounted(() => {
    generateRandomNumber();
    intervalId = setInterval(generateRandomNumber, time);
  });

  onBeforeUnmount(() => {
    clearInterval(intervalId);
  });

  return randomNumber;
}
