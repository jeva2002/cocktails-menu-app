import { Form as FormikForm } from 'formik';
import TextField from '../Common/Form/TextField';

const Form: React.FunctionComponent = () => {
  return (
    <FormikForm className='front-form'>
      <TextField
        label='Correo Electrónico'
        name='email'
        type='email'
        image='mail'
      />
      <TextField label='Contraseña' name='password' type='password' image='key' />
      <button className='btn' type='submit'>Iniciar Sesión</button>
    </FormikForm>
  );
};

export default Form;
