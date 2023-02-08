import { useField } from 'formik';
import { capitalize } from '../../../../model/utils/FormatData';
import { key, mail, user } from '../../../../assets/icons/index';

interface Props {
  name: string;
  label: string;
  type?: string;
  className?: string;
  image?: string;
}

const icons = (name: string) => {
  switch (name) {
    case 'mail':
      return mail;
    case 'key':
      return key;
    default:
      return user;
  }
};

const TextField: React.FunctionComponent<Props> = ({
  name,
  label,
  type,
  className,
  image,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={className ? className : 'text-input'}>
      {image ? (
        <img
          className='icon'
          src={icons(image)}
          alt='input icon'
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            marginTop: 8,
            marginLeft: 5,
          }}
        />
      ) : null}
      <input {...field} type={type ?? 'text'} placeholder={capitalize(label)} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextField;
