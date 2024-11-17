import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from './SignIn.model.jsx';
import { useLoginMutation } from '../../shared/api/articlesApi.js';
import { useEffect } from 'react';
import { Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logIn } from '../../app/redux/authSlice.js';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export function SignInUi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailAddress: '',
      password: '',
    },
    resolver: yupResolver(schemaLogin),
  });
  const [loginUser, { data: loginData, error, isSuccess, isError }] = useLoginMutation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(logIn(loginData.user.token));
      localStorage.setItem('token', loginData.user.token);
      navigate('/', { replace: true });
    }
  }, [isSuccess]);
  const submit = async (data) => {
    const userData = {
      user: {
        email: data.emailAddress,
        password: data.password,
      },
    };
    await loginUser(userData).unwrap();
  };

  return (
    <>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontWeight: '500', textAlign: 'center' }}
        >
          Sign in
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
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Controller
              name="emailAddress"
              control={control}
              render={({ field }) => (
                <TextField
                  error={Boolean(errors.emailAddress)}
                  helperText={errors.emailAddress?.message}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  fullWidth
                  variant="outlined"
                  color={errors.emailAddress ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'email' }}
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password">Password</FormLabel>
            </Box>
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
          {isError && (
            <Alert severity="error">
              Email or password {error.data.errors['email or password']}
            </Alert>
          )}
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </>
  );
}
