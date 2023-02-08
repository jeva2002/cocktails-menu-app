import { Formik } from 'formik';
import handleLogin from '../../controller/handlers/login';
import { LOGIN_VALIDATION } from '../../model/utils/FormValidations';
import Form from '../components/Login/Form';
import logo from '../../assets/imgs/logo.png';

export interface LoginValues {
  email: string;
  password: string;
}

const INITIAL_VALUES: LoginValues = {
  email: '',
  password: '',
};

const Login: React.FunctionComponent = () => {
  return (
    <div className='front-page'>
      <img src={logo} alt='Cocktails' />
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={LOGIN_VALIDATION}
        onSubmit={handleLogin}
      >
        <Form />
      </Formik>
    </div>
  );
};

export default Login;
