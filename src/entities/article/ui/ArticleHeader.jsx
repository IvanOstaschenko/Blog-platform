import { Box, Typography } from '@mui/material';
import styled from './ArticleHeader.module.css';
import { UserPreview } from '../../../shared/ui/userInfo/index.jsx';
import PropTypes from 'prop-types';
import { FavoriteArticle } from '../../../features/index.js';
import { TagList } from '../../../shared/ui/article/index.jsx';
import { useSelector } from 'react-redux';
import {
  useDeleteArticleMutation,
  useGetCurrentUserQuery,
} from '../../../shared/api/articlesApi.js';
import { Popconfirm, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export function ArticleHeader({ article }) {
  const navigate = useNavigate();
  const log = useSelector((state) => state.auth.token);
  const { data } = useGetCurrentUserQuery();
  const [dejeteArticle, { isSuccess }] = useDeleteArticleMutation();
  function isLoggedOwner() {
    if (!log) return false;
    console.log(article.author.username === data.user.username);
    return article.author.username === data.user.username;
  }
  const confirm = async () => {
    await dejeteArticle(article.slug).unwrap();
    isSuccess && message.success('Article deleted');
    navigate(-1, { replace: true });
  };
  const cancel = () => {
    console.log('Delete cancelled');
  };
  return (
    <Box className={styled.wrapper}>
      <Box>
        <Box className={styled['title-row']}>
          <Typography variant="h5" sx={{ color: '#1890FF' }}>
            {article.title}
          </Typography>
          <FavoriteArticle count={article.favoritesCount} slug={article.slug} />
        </Box>
        <TagList dataList={article.tagList} />
        <Typography variant="body2">{article.description}</Typography>
      </Box>
      <Box>
        <UserPreview
          date={article.createdAt}
          name={article.author.username}
          image={article.author.image}
        />
        {isLoggedOwner() && (
          <Box sx={{ marginTop: '30px' }}>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this article?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Link to={`/articles/${article.slug}/edit`} className={styled['edit-link']}>
              Edit
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}

ArticleHeader.propTypes = {
  article: PropTypes.object.isRequired,
};
