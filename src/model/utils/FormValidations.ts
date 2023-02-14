import * as Yup from 'yup';

const messagesLog = {
  email: 'El texto no parece ser un correo',
  needEmail: 'Se requiere un correo',
  password: 'Se requiere una contraseña',
  username: 'Se requiere un nombre de usuario',
  name: 'Se requiere del nombre del propietario',
};

const messagesAdmin = {
  amount: 'Se requiere de una cantidad',
  postive: 'El número debe ser positivo',
  ingredient: 'Se requiere de al menos un ingrediente',
  nameIngredient: 'Se requiere de un nombre para el ingrediente',
  nameCocktail: 'Se requiere de un nombre para el coctel',
  img: 'Se requiere del enlace de un imagen',
  price: 'Se requiere de un precio',
};
export const LOGIN_VALIDATION = Yup.object().shape({
  email: Yup.string().email(messagesLog.email).required(messagesLog.needEmail),
  password: Yup.string().required(messagesLog.password),
});

export const REGISTER_VALIDATION = Yup.object().shape({
  email: Yup.string().email(messagesLog.email).required(messagesLog.needEmail),
  password: Yup.string().required(messagesLog.password),
  username: Yup.string().required(messagesLog.username),
  name: Yup.string().required(messagesLog.name),
});

export const ADD_INGREDIENT_VALIDATION = Yup.object().shape({
  amount: Yup.number()
    .required(messagesAdmin.amount)
    .positive(messagesAdmin.postive),
  name: Yup.string().required(messagesAdmin.nameIngredient),
});

export const CREATE_COCKTAIL_VALIDATION = Yup.object().shape({
  name: Yup.string().required(messagesAdmin.nameCocktail),
  price: Yup.number()
    .positive(messagesAdmin.postive)
    .required(messagesAdmin.price),
  img: Yup.string().required(messagesAdmin.img),
  ingredients: Yup.array().required(messagesAdmin.ingredient),
});
