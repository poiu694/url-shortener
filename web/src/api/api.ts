import axios from 'axios';

function createAPIFactory() {
  const instance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  return instance;
}

export const api = createAPIFactory();
