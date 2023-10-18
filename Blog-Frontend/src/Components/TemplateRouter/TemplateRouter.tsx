import React from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';
import BlogList from '../BlogsList/BlogsList';
import TemplateLayout from '../TemplateLayout/TemplateLayout';
import BlogSection from '../BlogSection/BlogSection';
import Signin from '../SignIn/SignIn';
import CareersList from '../CareersList/CareersList';
import CreateCareers from '../CreateCareers/CreateCareers';
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
        path: `${BrowserRoutes.CAREERSLIST}`,
        element: <CareersList />,
      },
      {
        path: `${BrowserRoutes.CREATECAREERS}`,
        element: <CreateCareers />,
      },
      {
        path: `${BrowserRoutes.EDITCAREERS}`,
        element: <CreateCareers />,
      },
    ],
  },
]);

const TemplateRouter: React.FC = () => <RouterProvider router={routerConfig} />;

export default TemplateRouter;
