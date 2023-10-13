import React from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';
import BlogList from '../BlogsList/BlogsList';
import TemplateLayout from '../TemplateLayout/TemplateLayout';
import BlogSection from '../BlogSection/BlogSection';
import Signup from '../SignUp/SignUp';
import Signin from '../SignIn/SignIn';
import RouterPage from '../RouterPage/RouterPage';
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
        path: `${BrowserRoutes.SIGNUP}`,
        element: <Signup />,
      },
      {
        path: `${BrowserRoutes.SIGNIN}`,
        element: <Signin />,
      },
      {
        path: `${BrowserRoutes.ROUTER}`,
        element: <RouterPage />,
      },
    ],
  },
]);

const TemplateRouter: React.FC = () => <RouterProvider router={routerConfig} />;

export default TemplateRouter;
