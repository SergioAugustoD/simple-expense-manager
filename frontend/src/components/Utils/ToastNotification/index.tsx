import { toast } from 'react-toastify';

const toastSuccess = (msg: string) => {
  return toast.success(msg)
}
const toastError = (msg: string) => {
  return toast.error(msg)
}
const toastWarning = (msg: string) => {
  return toast.warning(msg)
}

export const ToastNotification = {
  toastSuccess,
  toastError,
  toastWarning
};