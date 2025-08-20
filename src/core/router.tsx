import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import Competence1 from '../pages/Competence1';
import Competence2 from '../pages/Competence2';
import Competence6 from '../pages/Competence6';

const router = createBrowserRouter([
  {
    path: '/portfolio/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'competence1', element: <Competence1 /> },
      { path: 'competence2', element: <Competence2 /> },
      { path: 'competence6', element: <Competence6 /> },
    ],
  },
]);

export default router;
