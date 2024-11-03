import { Header } from '../../widgets/header/index.jsx';
import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
