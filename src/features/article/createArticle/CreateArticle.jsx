import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCreateArticleMutation } from '../../../shared/api/articlesApi.js';
import { ArticleForm } from '../../../shared/ui/article/index.jsx';
import { Alert } from '@mui/material';

export function CreateArticle() {
  const navigate = useNavigate();
  const [createArticle, { isSuccess, isError }] = useCreateArticleMutation();
  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true });
    }
  }, [isSuccess]);
  const submit = async (data) => {
    await createArticle({ article: data }).unwrap();
  };

  return (
    <>
      <ArticleForm submit={submit} />
      {isError && <Alert severity="error">Произошла ошибка отправки данных</Alert>}
    </>
  );
}
