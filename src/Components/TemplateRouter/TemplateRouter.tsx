import React from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { BrowserRoutes } from '../../Constants/BrowseRoutes';
import BlogList from '../BlogsList/BlogsList';
import TemplateLayout from '../TemplateLayout/TemplateLayout';
import BlogSection from '../BlogSection/BlogSection';
const routerConfig = createBrowserRouter([
  {
    path: BrowserRoutes.HOME,
    element: <TemplateLayout />,
    children: [
      {
        path: BrowserRoutes.CREATEBLOGS,
        element: <BlogSection />,
      },
      {
        path: `${BrowserRoutes.BLOGLIST}`,
        element: <BlogList />,
      },
    ],
  },
]);

const TemplateRouter: React.FC = () => <RouterProvider router={routerConfig} />;

export default TemplateRouter;
