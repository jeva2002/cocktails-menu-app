import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { revertCamelCase } from '../../../../../../model/utils/formatString';
import Badget from './Badget';

interface Props {
  name: string;
  options: string[];
}

const SelectIngredient: React.FunctionComponent<Props> = ({
  name,
  options,
}) => {
  const [field, , helpers] = useField(name);
  const [ingredients, setIngredients] =
    useState<{ name: string; amount: number }[]>();

  useEffect(() => {
    helpers.setValue(ingredients);
  }, [ingredients]);

  return (
    <div className='col-lg-7 col-12 d-flex flex-column'>
      <div className='select d-flex flex-column align-items-center'>
        <select
          className=''
          name={field.name}
          onChange={(e) => {
            if (ingredients === undefined)
              setIngredients([{ name: e.target.value, amount: 0 }]);
            else if (
              ingredients.find(
                (ingredient) => ingredient.name === e.target.value
              ) === undefined &&
              e.target.value !== ''
            )
              setIngredients([
                ...ingredients,
                { name: e.target.value, amount: 1 },
              ]);
          }}
        >
          <option value={''}>Seleccionar Ingrediente</option>
          {options
            ? options.map((e, index) => (
                <option key={index} value={e}>
                  {revertCamelCase(e)}
                </option>
              ))
            : null}
        </select>
      </div>
      <section className='badgets d-flex flex-wrap mt-3 gap-2'>
        {ingredients?.map((e, index) => (
          <Badget
            key={index}
            amount={e.amount}
            name={e.name}
            id={index}
            setIngredients={setIngredients}
          />
        ))}
      </section>
    </div>
  );
};

export default SelectIngredient;
