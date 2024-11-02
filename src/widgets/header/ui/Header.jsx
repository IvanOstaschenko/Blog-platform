import PropTypes from 'prop-types';
import styles from './Header.module.scss';
export const Header = ({ children }) => {
  return <header className={styles.header}>Realworld Blog{children}</header>;
};
Header.propTypes = {
  children: PropTypes.node.isRequired,
};
