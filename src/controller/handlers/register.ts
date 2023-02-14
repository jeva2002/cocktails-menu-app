import { createBasicUser } from '../../model/firebase/auth';
import { RegisterValues } from '../../view/pages/Register';
import { handleError, handleSuccess } from './responses';

const handleRegister = async (registerValues: RegisterValues) => {
  try {
    const credential = await createBasicUser(
      registerValues.email,
      registerValues.password,
      registerValues.name
    );
    handleSuccess('El registro ha sido existoso');
    return credential;
  } catch (error) {
    handleError(error);
  }
};

export default handleRegister;
