import { useGetArticleQuery } from '../../../shared/api/index.js';
import styled from './Article.module.css';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Container } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import { ArticleHeader } from './ArticleHeader.jsx';

export function Article({ slug }) {
  const { data, isLoading } = useGetArticleQuery(slug);
  if (isLoading) return <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />;
  return (
    <Container className={styled['container']}>
      <ArticleHeader article={data.article} />
      <Box className={styled.content}>
        <Markdown>{data.article.body}</Markdown>
      </Box>
    </Container>
  );
}

Article.propTypes = {
  slug: PropTypes.string.isRequired,
};
