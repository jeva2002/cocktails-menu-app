import { useField } from 'formik';
import { revertCamelCase } from '../../../../model/utils/formatString';

interface Props {
  name: string;
  options: string[];
}

const Select: React.FunctionComponent<Props> = ({ name, options }) => {
  const [field, meta] = useField(name);

  return (
    <div className='select'>
      <select {...field}>
        <option value={''}>Seleccionar Ingrediente</option>
        {options
          ? options.map((e, index) => (
              <option key={index} value={e}>
                {revertCamelCase(e)}
              </option>
            ))
          : null}
      </select>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Select;
