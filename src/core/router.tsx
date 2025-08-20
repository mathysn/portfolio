import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';

const router = createBrowserRouter([
  {
    path: '/portfolio',
    element: <Layout />,
    children: [
      { path: 'portfolio/', element: <Home /> },
      { path: 'portfolio/projects', element: <Projects /> },
      { path: 'portfolio/contact', element: <Contact /> },
    ],
  },
]);

export const AppRouterProvider = () => (
  <RouterProvider router={router} />
);
