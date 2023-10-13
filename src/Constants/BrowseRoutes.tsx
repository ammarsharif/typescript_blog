export const BrowserRoutes = {
  HOME: '/',
  CREATEBLOGS: '/',
  ROUTER: 'router',
  EDITBLOGS: '/blogslist/:blogUrl',
  BLOGLIST: 'blogslist',
  SIGNUP: 'signup',
  SIGNIN: 'signin',
} as const;
export const BASE_API = 'https://5ec0-39-62-101-65.ngrok.io';

export const getAuthToken = () => {
  return 'Bearer ' + localStorage.getItem('token');
};
export const getHeadersData = () => {
  return {
    headers: {
      Authorization: getAuthToken(),
      'Content-Type': 'application/json',
    },
  };
};
