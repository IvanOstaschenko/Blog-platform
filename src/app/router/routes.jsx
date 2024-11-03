import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout.jsx';
import { FeedPage } from '../../pages/feed/index.jsx';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<FeedPage />} />
    </Route>,
  ),
);
