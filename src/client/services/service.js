import request from './fetch';
export const getItems = () => request.get(`/items`);
export const searchItems = (searchString) => request.get(`/items?search=${searchString}`);