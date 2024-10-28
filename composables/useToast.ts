export type ToastType = "success" | "warning" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const toasts = ref<Toast[]>([])

const useToast = () => {
  const showToast = (type: ToastType, message: string, delay: number = 3000) => {
    const id = Math.random().toString(36).substring(2,9);
    toasts.value.push({id, type, message})

    setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id)
    }, delay)
  };

  const clearToast = (id: string) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    toasts,
    showToast,
    clearToast,
  };
};

export default useToast;
