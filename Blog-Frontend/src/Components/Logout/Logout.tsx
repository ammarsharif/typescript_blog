import { useState } from 'react';
import styles from './Logout.module.css';
interface LogoutProps {
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    onLogout();
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <button
      className={styles.logoutButton}
      onClick={isLoggedIn ? handleLogout : handleLogin}
    >
      Log Out
    </button>
  );
};

export default Logout;
