import { signIn } from '../../model/firebase/auth';
import { LoginValues } from '../../view/pages/Login';

const handleLogin = async (loginValues: LoginValues) => {
  try {
    const credentials = await signIn(loginValues.email, loginValues.password);
    console.log(credentials);
  } catch (error) {
    console.error(error);
  }
};

export default handleLogin;
