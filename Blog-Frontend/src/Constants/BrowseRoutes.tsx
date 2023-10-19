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
