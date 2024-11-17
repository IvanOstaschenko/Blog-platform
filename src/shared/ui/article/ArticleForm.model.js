import * as yup from 'yup';

export const schemaEditArticle = yup.object().shape({
  title: yup.string().required('Заголовок обязателен'),
  description: yup.string().required('Описание обязательно'),
  body: yup.string().required('Содержание статьи обязательно'),
});
