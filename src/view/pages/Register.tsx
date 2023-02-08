import { Formik } from 'formik';
import { REGISTER_VALIDATION } from '../../model/utils/FormValidations';
import Form from '../components/Register/Form';
import logo from '../../assets/imgs/logo.png';
import handleRegister from '../../controller/handlers/register';

export interface RegisterValues {
  email: string;
  password: string;
  username: string;
  name: string;
}

const INITIAL_VALUES: RegisterValues = {
  email: '',
  password: '',
  username: '',
  name: '',
};

const Register: React.FunctionComponent = () => {
  return (
    <main className='main-container front-page'>
      <img src={logo} alt='Cocktails' />
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={REGISTER_VALIDATION}
        onSubmit={handleRegister}
      >
        <Form />
      </Formik>
    </main>
  );
};

export default Register;
