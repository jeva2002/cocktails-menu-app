import { FirebaseError } from 'firebase/app';
import Swal from 'sweetalert2';

export const generateCustomError = (title?: string, message?: string) => {
  Swal.fire({
    icon: 'error',
    title: title ?? 'Ha ocurrido un error inesperado',
    text: message ?? '',
  });
};

export const handleError = (
  error: any,
  title?: string,
  message?: string
): void => {
  if (error instanceof FirebaseError)
    generateCustomError(error.code, error.message);
  else if (error instanceof Error)
    generateCustomError(error.name, error.message);
  else generateCustomError(title, message);
};

export const handleSuccess = (title?: string, message?: string): void => {
  Swal.fire({
    icon: 'success',
    title: title ?? 'La operación ha sido exitosa',
    text: message ?? '',
  });
};

export const handleConfirm = (
  confirmEvent: () => any,
  title?: string,
  message?: string
) => {
  Swal.fire({
    title: title ?? '¿Desea continuar la operación?',
    text: message ?? '',
    showCancelButton: true,
    showConfirmButton: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await confirmEvent();
        handleSuccess(title ?? 'La operación ha sido exitosa', message ?? '');
      } catch (error) {
        throw error;
      }
    }
  });
};
