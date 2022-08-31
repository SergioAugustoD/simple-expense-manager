import axios from 'axios';

export const Api = axios.create({ baseURL: 'http://localhost:8091/api/v1/' });