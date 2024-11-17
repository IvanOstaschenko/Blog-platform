import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout.jsx';
import {
  ArticlePage,
  EditArticlePage,
  FeedPage,
  NewArticlePage,
  NotFound,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from '../../pages/index.js';
import { PrivateRoute } from '../../shared/ui/privateRoute/PrivateRoute.jsx';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<FeedPage />} />
      <Route path="article/:slug" element={<ArticlePage />} />
      <Route
        path="new-article"
        element={
          <PrivateRoute>
            <NewArticlePage />
          </PrivateRoute>
        }
      />
      <Route path="articles/:slug/edit" element={<EditArticlePage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
