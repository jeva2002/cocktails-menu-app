import axios from 'axios';

const API = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
});

const getData = async () => {
  try {
    return await (
      await API.get('')
    ).data;
  } catch (error) {
    throw error;
  }
};

export default getData;
