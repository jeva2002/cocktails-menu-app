import { Link } from 'react-router-dom';

const NotFound: React.FunctionComponent = (props) => {
  return (
    <main className='not-found d-flex flex-column text-light align-items-center justify-content-center gap-5 h-100 rounded'>
      <h1>:c</h1>
      <h1>La página no ha sido encontrada...</h1>
      <Link to='/' className='h3 w-50 text-center'>
        Intenta de nuevo ingresar por medio de este link
      </Link>
    </main>
  );
};

export default NotFound;
