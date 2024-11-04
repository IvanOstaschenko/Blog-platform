import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog-platform.kata.academy/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (page) => `articles?offset=${page === 1 ? 0 : (page - 1) * 20}`,
    }),
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleQuery } = articlesApi;
