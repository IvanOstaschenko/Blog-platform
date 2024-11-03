import { useState } from 'react';
import { Container, List, ListItem, Pagination } from '@mui/material';
import ArticleRow from './ArticleRow.jsx';
import styled from './Feed.module.css';
import { useGetArticlesQuery } from '../../../shared/api/index.js';
import { paginationCount } from '../lib/paginationCount.js';
import { useSelector } from 'react-redux';

export function Feed() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetArticlesQuery(page);
  console.log('DATA', data);
  const user = useSelector((state) => state.user.user);
  console.log('user', user);
  function paginationHandler(event, page) {
    setPage(page);
  }
  if (isLoading) return <div>Loading</div>;
  return (
    <Container sx={{ maxWidth: '940px' }} className={styled['container']}>
      <List sx={{ paddingTop: '25px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {data.articles.map((art) => (
          <ListItem key={art.slug} className={styled['list-item']}>
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
