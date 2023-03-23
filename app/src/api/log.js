import { get } from ".";

export const getLogApi = (data) => {
  return get('/upload/log', data);
}