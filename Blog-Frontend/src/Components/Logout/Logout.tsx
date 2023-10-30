import React, { useState } from 'react';
import styles from './Logout.module.css';

const Logout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const buttonText = isLoggedIn ? 'User' : 'Log Out';

  return (
    <button
      className={styles.logoutButton}
      onClick={isLoggedIn ? handleLogout : handleLogin}
    >
      {buttonText}
    </button>
  );
};

export default Logout;
