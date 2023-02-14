import { Form } from 'formik';
import TextField from '../../../../Common/Form/TextField';

const AddNewIngredientForm: React.FunctionComponent = () => {
  return (
    <Form className='bg-light p-5 d-flex flex-column gap-3 align-items-center border rounded border-primary'>
      <TextField name='amount' label='Cantidad' type='number' />
      <TextField name='name' label='Nuevo ingrediente' />
      <button className='btn' type='submit'>
        Crear
      </button>
    </Form>
  );
};

export default AddNewIngredientForm;
