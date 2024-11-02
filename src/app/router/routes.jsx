import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout.jsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
  },
]);
