export const BrowserRoutes = {
  HOME: '/',
  CREATEBLOGS: '/',
  EDITBLOGS: '/blogslist/:blogUrl',
  BLOGLIST: 'blogslist',
  CAREERSLIST: 'careerslist',
  CREATECAREERS: '/createcareers',
  EDITCAREERS: '/careerslist/:jobUrl',
  SIGNIN: 'signin',
} as const;
export const BASE_API = 'http://localhost:5200';

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
