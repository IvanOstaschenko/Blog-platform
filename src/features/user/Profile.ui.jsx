import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useUpdateUserMutation } from '../../shared/api/articlesApi.js';
import { schemaProfile } from './Profile.model.jsx';
import { useSelector } from 'react-redux';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: '"Roboto", "sans-serif"',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: '60px auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '385px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export function Profile() {
  const navigate = useNavigate();
  const log = useSelector((state) => state.auth.token);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: '',
      emailAddress: '',
      password: '',
      image: '',
    },
    resolver: yupResolver(schemaProfile),
  });
  const [updateUser, { error, isSuccess }] = useUpdateUserMutation();
  useEffect(() => {
    if (isSuccess) navigate(-1, { replace: true });
  });

  const submit = async (data) => {
    const userData = {
      user: {
        username: data.userName,
        email: data.emailAddress,
        password: data.password,
        image: data.image || null,
      },
    };
    await updateUser({ body: userData, token: log }).unwrap();
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h5"
        sx={{ width: '100%', fontWeight: '500', textAlign: 'center' }}
      >
        Edit Profile
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Username</FormLabel>
          <Controller
            name="userName"
            control={control}
            render={({ field }) => (
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                placeholder="Username"
                error={Boolean(errors.userName) || Boolean(error?.data.errors.userName)}
                helperText={errors.userName?.message || error?.data.errors.userName}
                color={errors.userName ? 'error' : 'primary'}
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Controller
            name="emailAddress"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                id="email"
                placeholder="Email address"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={Boolean(errors.emailAddress) || Boolean(error?.data.errors.email)}
                helperText={errors.emailAddress?.message || error?.data.errors.email}
                color={errors.emailAddress ? 'error' : 'primary'}
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">New password</FormLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                color={errors.password ? 'error' : 'primary'}
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="repeatPassword">Avatar image (url)</FormLabel>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                name="image"
                placeholder="Avatar image"
                id="image"
                variant="outlined"
                error={Boolean(errors.image)}
                helperText={errors.image?.message}
                color={errors.image ? 'error' : 'primary'}
                {...field}
              />
            )}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained" sx={{ textTransform: 'none' }}>
          Save
        </Button>
      </Box>
    </Card>
  );
}
