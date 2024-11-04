import { useState } from 'react';
import { CircularProgress, Container, List, ListItem, Pagination } from '@mui/material';
import styled from './Feed.module.css';
import { useGetArticlesQuery } from '../../../shared/api/index.js';
import { paginationCount } from '../lib/paginationCount.js';
import { ArticleRow } from './ArticleRow.jsx';

export function Feed() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetArticlesQuery(page);
  function paginationHandler(event, page) {
    setPage(page);
  }
  if (isLoading) return <CircularProgress style={{ position: 'fixed', top: '50%', left: '50%' }} />;
  return (
    <Container className={styled['container']}>
      <List sx={{ paddingTop: '25px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {data.articles.map((art, index) => (
          <ListItem key={art.slug + `${index}`} className={styled['list-item']}>
            <ArticleRow article={art} />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={paginationCount(data.articles, data.articlesCount)}
        shape="rounded"
        color="primary"
        size="small"
        sx={{ margin: '26px 0 15px', display: 'flex', justifyContent: 'center' }}
        onChange={paginationHandler}
      />
    </Container>
  );
}
