import { createBasicUser } from '../../model/firebase/auth';
import { RegisterValues } from '../../view/pages/Register';

const handleRegister = async (registerValues: RegisterValues) => {
  try {
    console.log(
      await createBasicUser(
        registerValues.email,
        registerValues.password,
        registerValues.name
      )
    );
  } catch (error) {
    console.error(error);
  }
};

export default handleRegister;
