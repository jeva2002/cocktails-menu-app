import { Form } from 'formik';
import TextField from '../../../../Common/Form/TextField';
import SelectIngredient from '../common/SelectIngredient';

interface Props {
  ingredients: [string, number][];
}

const UpdateCocktailForm: React.FunctionComponent<Props> = ({
  ingredients,
}) => {
  return (
    <Form className='d-flex flex-column align-items-center w-100 gap-2'>
      <div className='d-flex flex-column-reverse flex-lg-row gap-5'>
        <SelectIngredient
          options={ingredients.map((e) => e[0])}
          name='ingredients'
        />
        <div className='d-flex flex-column align-items-center justify-content-evenly gap-3 col-lg-4 col-12'>
          <TextField name='name' label='Nombre' />
          <TextField name='price' label='Precio' type='number' />
          <TextField name='img' label='Imagen' />
        </div>
      </div>
      <button className='btn' type='submit'>
        Crear
      </button>
    </Form>
  );
};

export default UpdateCocktailForm;
