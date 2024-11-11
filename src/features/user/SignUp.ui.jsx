import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { schemaReg } from './SignUp.model.jsx';
import { useCreateAccountMutation } from '../../shared/api/articlesApi.js';

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

export function SignUpUi() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
    resolver: yupResolver(schemaReg),
  });
  const [createAccount, { error, isSuccess }] = useCreateAccountMutation();
  useEffect(() => {
    if (isSuccess) navigate('/signin');
  }, [isSuccess]);

  const submit = async (data) => {
    const userData = {
      user: {
        username: data.userName,
        email: data.emailAddress,
        password: data.password,
      },
    };
    await createAccount(userData).unwrap();
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h5"
        sx={{ width: '100%', fontWeight: '500', textAlign: 'center' }}
      >
        Create new account
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
          <FormLabel htmlFor="password">Password</FormLabel>
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
          <FormLabel htmlFor="repeatPassword">Repeat Password</FormLabel>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                name="repeatPassword"
                placeholder="Password"
                type="password"
                id="repeatPassword"
                autoComplete="new-password"
                variant="outlined"
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
                color={errors.confirmPassword ? 'error' : 'primary'}
                {...field}
              />
            )}
          />
        </FormControl>
        <Tooltip
          open={Boolean(errors.agree)}
          arrow={true}
          placement="left"
          title="Обязательно для заполнения"
        >
          <FormControlLabel
            control={
              <Controller
                name="agree"
                control={control}
                render={({ field }) => <Checkbox required color="primary" {...field} />}
              />
            }
            label="I agree to the processing of my personal
information"
          />
        </Tooltip>
        <Button type="submit" fullWidth variant="contained" sx={{ textTransform: 'none' }}>
          Create
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <span>
            <Link to="/signin" variant="body2" sx={{ alignSelf: 'center' }}>
              Sign in
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
