import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  {
    maxRetries: 5,
  },
);

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  tagTypes: ['User', 'Article', 'Feed'],
  baseQuery: staggeredBaseQuery,
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (page) => `articles?offset=${page === 1 ? 0 : (page - 1) * 20}`,
      providesTags: ['Feed'],
    }),
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
      providesTags: ['Article'],
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
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query({
      query: () => `user/`,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: 'user',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    createArticle: builder.mutation({
      query: (data) => ({
        url: 'articles',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Feed'],
    }),
    updateArticle: builder.mutation({
      query: (data) => ({
        url: `articles/${data.slug}`,
        method: 'PUT',
        body: data.body,
      }),
      invalidatesTags: ['Feed', 'Article'],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'Delete',
      }),
      invalidatesTags: ['Feed'],
    }),
    favoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Feed', 'Article'],
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
  useCreateArticleMutation,
  useFavoriteArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi;
