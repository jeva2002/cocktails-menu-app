import { Formik } from 'formik';
import handleLogin from '../../controller/handlers/login';
import { LOGIN_VALIDATION } from '../../model/utils/FormValidations';
import Form from '../components/Login/Form';
import logo from '../../assets/imgs/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../controller/slices/user';
import { Navigate } from 'react-router-dom';

export interface LoginValues {
  email: string;
  password: string;
}

const INITIAL_VALUES: LoginValues = {
  email: '',
  password: '',
};

const Login: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  if (user.email !== '' && user.username !== '')
    return <Navigate to='/dashboard' />;
  return (
    <main className='main-container front-page'>
      <img src={logo} alt='Cocktails' />
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={LOGIN_VALIDATION}
        onSubmit={async (values) => {
          const credential = await handleLogin(values);
          if (credential)
            dispatch(
              setUser({
                username: credential.user.displayName ?? '',
                email: credential.user.email ?? '',
              })
            );
        }}
      >
        <Form />
      </Formik>
    </main>
  );
};

export default Login;
