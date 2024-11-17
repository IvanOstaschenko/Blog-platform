import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetArticleQuery, useUpdateArticleMutation } from '../../../shared/api/articlesApi.js';
import { ArticleForm } from '../../../shared/ui/article/index.jsx';
import { Alert } from '@mui/material';

export function EditArticle() {
  const { slug } = useParams();
  const { data } = useGetArticleQuery(slug);
  const navigate = useNavigate();
  const [editArticle, { isSuccess, isError }] = useUpdateArticleMutation();
  useEffect(() => {
    if (isSuccess) {
      navigate(-1, { replace: true });
    }
  }, [isSuccess]);
  const submit = async (data) => {
    const { title, description, body, tagList } = data;
    const request = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    await editArticle({ body: request, slug }).unwrap();
  };

  return (
    <>
      <ArticleForm submit={submit} article={data.article} />
      {isError && <Alert severity="error">Произошла ошибка отправки данных</Alert>}
    </>
  );
}
