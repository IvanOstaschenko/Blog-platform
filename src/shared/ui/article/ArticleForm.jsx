import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { schemaEditArticle } from './ArticleForm.model.js';
import { useEffect } from 'react';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: '35px auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '940px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export function ArticleForm({ submit, article }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [' '],
    },
    resolver: yupResolver(schemaEditArticle),
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'tagList' });
  useEffect(() => {
    if (article) {
      reset(article);
    }
  }, []);
  return (
    <>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontWeight: '500', textAlign: 'center' }}
        >
          {article ? 'Edit article' : 'Create new article'}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submit)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  fullWidth
                  variant="outlined"
                  color={errors.title ? 'error' : 'primary'}
                  size="small"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="description">Short description</FormLabel>
            </Box>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  name="description"
                  placeholder="Description"
                  id="description"
                  variant="outlined"
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  color={errors.description ? 'error' : 'primary'}
                  size="small"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="body">Text</FormLabel>
            </Box>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  name="body"
                  placeholder="Text"
                  id="body"
                  variant="outlined"
                  error={Boolean(errors.body)}
                  helperText={errors.body?.message}
                  color={errors.body ? 'error' : 'primary'}
                  {...field}
                />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {fields.map((field, index) => (
                <Box key={field.id}>
                  <Controller
                    name={`tagList.${index}`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        name="tag"
                        placeholder="Tag"
                        variant="outlined"
                        color="primary"
                        sx={{ width: '340px' }}
                        size="small"
                        {...field}
                      />
                    )}
                  />
                  <Button
                    variant="outlined"
                    sx={{ paddingBlock: '6px', marginLeft: '15px' }}
                    size="medium"
                    color="error"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>
            <Button
              variant="outlined"
              sx={{ width: '136px', marginLeft: '15px', paddingBlock: '6.5px' }}
              onClick={() => append('')}
            >
              Add tag
            </Button>
          </Box>
          <Button type="submit" sx={{ width: '320px' }} variant="contained">
            Send
          </Button>
        </Box>
      </Card>
    </>
  );
}
ArticleForm.propTypes = {
  submit: PropTypes.func.isRequired,
  article: PropTypes.object,
};
