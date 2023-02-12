import * as Yup from 'yup';

export const LOGIN_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('El texto no parece ser un correo')
    .required('Se requiere un correo'),
  password: Yup.string().required('Se requiere una contraseña'),
});

export const REGISTER_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email('El texto no parece ser un correo')
    .required('Se requiere un correo'),
  password: Yup.string().required('Se requiere una contraseña'),
  username: Yup.string().required('Se requiere un nombre de usuario'),
  name: Yup.string().required('Se requiere de un nombre'),
});

export const ADD_INGREDIENT_VALIDATION = Yup.object().shape({
  amount: Yup.number().required().integer().positive(),
  name: Yup.string().required(),
});
