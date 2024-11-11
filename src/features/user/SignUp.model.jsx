import * as yup from 'yup';

export const schemaReg = yup.object().shape({
  userName: yup
    .string()
    .min(3, 'Имя должно содержать не менее 3 символов')
    .max(20, 'Имя должно содержать не более 20 символов')
    .required('Имя пользователя обязательно'),
  emailAddress: yup
    .string()
    .email('Неверный формат электронной почты')
    .required('Электронная почта обязательна'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .max(40, 'Пароль должен содержать не более 40 символов'),
  confirmPassword: yup
    .string()
    .required('Подтверждение пароля обязательно')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  agree: yup.bool().oneOf([true], 'Необходимо согласие'),
});
