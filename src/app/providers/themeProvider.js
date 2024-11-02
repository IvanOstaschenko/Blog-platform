import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          variants: [
            {
              props: { variant: 'signin' },
              style: {
                borderRadius: '5px',
                fontSize: '18px',
                height: '50px',
                width: '110px',
                '&:hover': {
                  background: '#000',
                  color: '#fff',
                },
              },
            },
            {
              props: { variant: 'signup' },
              style: {
                border: '1px solid #52C41A',
                borderRadius: '5px',
                color: '#52C41A',
                fontSize: '18px',
                height: '50px',
                width: '110px',
                '&:hover': {
                  background: '#52C41A',
                  color: '#fff',
                },
              },
            },
            {
              props: { variant: 'createarticle' },
              style: {
                border: '1px solid #52C41A',
                borderRadius: '5px',
                color: '#52C41A',
                fontSize: '14px',
                height: '30px',
                paddingInline: '10px',
                '&:hover': {
                  background: '#52C41A',
                  color: '#fff',
                },
              },
            },
          ],
        },
      },
    },
  },
});
