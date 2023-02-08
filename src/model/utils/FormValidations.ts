import * as Yup from 'yup';

export const LOGIN_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('El texto no parece ser un correo')
    .required('Se requiere un correo'),
  password: Yup.string().required('Se requiere una contraseña'),
});
