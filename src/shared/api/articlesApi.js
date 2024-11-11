import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (page) => `articles?offset=${page === 1 ? 0 : (page - 1) * 20}`,
    }),
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
    }),
    createAccount: builder.mutation({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
    }),
    getCurrentUser: builder.query({
      query: (token) => ({
        url: `user/`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          authorization: `Bearer ${data.token}`,
        },
        body: data.body,
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateAccountMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} = articlesApi;
