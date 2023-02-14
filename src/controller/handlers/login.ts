import { signIn } from '../../model/firebase/auth';
import { LoginValues } from '../../view/pages/Login';
import { handleError, handleSuccess } from './responses';

const handleLogin = async (loginValues: LoginValues) => {
  try {
    const credential = await signIn(loginValues.email, loginValues.password);
    handleSuccess('Inicio de sesión exitoso');
    return credential;
  } catch (error) {
    handleError('Error inesperado', 'Ha ocurrido un error al iniciar sesión');
  }
};

export default handleLogin;
