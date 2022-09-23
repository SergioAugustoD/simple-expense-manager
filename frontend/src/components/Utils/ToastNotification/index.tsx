import { toast } from 'react-toastify';

const toastSuccess = (msg: string) => {
  return toast.success(msg, {
    pauseOnHover: false,
  })
}
const toastError = (msg: string) => {
  return toast.error(msg, {
    pauseOnHover: false,
  })
}
const toastWarning = (msg: string) => {
  return toast.warning(msg, {
    pauseOnHover: false,
  })
}

export const ToastNotification = {
  toastSuccess,
  toastError,
  toastWarning
};