import { getAuthToken } from './AuthToken';

export const getHeadersData = () => {
  return {
    headers: {
      Authorization: getAuthToken(),
      'Content-Type': 'application/json',
    },
  };
};
