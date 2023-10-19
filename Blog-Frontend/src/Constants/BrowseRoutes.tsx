export const BrowserRoutes = {
  HOME: '/',
  CREATEBLOGS: '/',
  EDITBLOGS: '/blogs/:blogUrl',
  BLOGLIST: 'blogs',
  JOBSLIST: 'jobs',
  CREATEJOBS: '/createjobs',
  EDITJOBS: '/jobs/:jobUrl',
  SIGNIN: 'signin',
} as const;
export const BASE_API = 'http://localhost:5200';
