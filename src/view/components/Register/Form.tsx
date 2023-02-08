import { Form as FormikForm } from 'formik';
import { Link } from 'react-router-dom';
import TextField from '../Common/Form/TextField';

const Form: React.FunctionComponent = () => {
  return (
    <FormikForm className='front-form'>
      <TextField label='Nombre de usuario' name='username' image='user' />
      <TextField label='Nombre Completo' name='name' image='user' />
      <TextField
        label='Correo Electrónico'
        name='email'
        type='email'
        image='mail'
      />
      <TextField
        label='Contraseña'
        name='password'
        type='password'
        image='key'
      />
      <button className='btn' type='submit'>
        Regístrate
      </button>
      <p>
        ¿Ya tienes una cuenta? <Link to='/'>Inicia Sesión</Link>
      </p>
    </FormikForm>
  );
};

export default Form;
