import { signIn } from '../../model/firebase/auth';
import { LoginValues } from '../../view/pages/Login';

const handleLogin = async (loginValues: LoginValues) => {
  try {
    return await signIn(loginValues.email, loginValues.password);
  } catch (error) {
    console.error(error);
  }
};

export default handleLogin;
