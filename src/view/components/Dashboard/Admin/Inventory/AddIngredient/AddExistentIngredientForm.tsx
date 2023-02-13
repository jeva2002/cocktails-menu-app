import { Form } from 'formik';
import Select from '../../../../Common/Form/Select';
import TextField from '../../../../Common/Form/TextField';

interface Props {
  ingredients: [string, number][];
}

const AddExistentIngredientForm: React.FunctionComponent<Props> = ({
  ingredients,
}) => {
  return (
    <Form className='bg-light p-5 d-flex flex-column gap-3 align-items-center border rounded border-danger'>
      <TextField name='amount' label='Amount' type='number' />
      <Select name='name' options={ingredients.map((e) => e[0])} />
      <button className='btn btn-danger' type='submit'>
        Agregar
      </button>
    </Form>
  );
};

export default AddExistentIngredientForm;
