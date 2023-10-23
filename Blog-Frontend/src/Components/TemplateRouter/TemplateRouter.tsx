import React from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';
import BlogList from '../BlogsList/BlogsList';
import TemplateLayout from '../TemplateLayout/TemplateLayout';
import BlogSection from '../BlogSection/BlogSection';
import Signin from '../SignIn/SignIn';
import JobsList from '../JobsList/JobsList';
import CreateJobs from '../CreateJobs/CreateJobs';
const routerConfig = createBrowserRouter([
  {
    path: BrowserRoutes.HOME,
    element: <TemplateLayout />,
    children: [
      {
        path: `${BrowserRoutes.EDITBLOGS}`,
        element: <BlogSection />,
      },
      {
        path: `${BrowserRoutes.CREATEBLOGS}`,
        element: <BlogSection />,
      },
      {
        path: `${BrowserRoutes.BLOGLIST}`,
        element: <BlogList />,
      },
      {
        path: `${BrowserRoutes.SIGNIN}`,
        element: <Signin />,
      },
      {
        path: `${BrowserRoutes.JOBSLIST}`,
        element: <JobsList />,
      },
      {
        path: `${BrowserRoutes.CREATEJOBS}`,
        element: <CreateJobs />,
      },
      {
        path: `${BrowserRoutes.EDITJOBS}`,
        element: <CreateJobs />,
      },
    ],
  },
]);

const TemplateRouter: React.FC = () => <RouterProvider router={routerConfig} />;

export default TemplateRouter;
