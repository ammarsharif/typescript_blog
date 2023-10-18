import React, { useState } from 'react';
import styles from './Signup.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import PanelSection from '../ReuseableComponents/PanelSection/PanelSection';
import { NavLink } from 'react-router-dom';

const Signup: React.FC = () => {
  const initialState = {
    userName: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  const [user, setUser] = useState(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <ContentContainer width={50}>
      <PanelSection>
        <div className={styles['signup-Form']} data-testid="Signup-From">
          <div className={styles['signup_container']}>
            <h3>SignUp Page</h3>
            <form className={styles['form-container']}>
              <div>
                <label className={styles['form-label']}>Name:</label>
                <input
                  className={styles['form-input']}
                  type="text"
                  name="userName"
                  value={user.userName}
                  placeholder="Blog Title"
                  onChange={handleStateChange}
                />
              </div>
              <div>
                <label className={styles['form-label']}>Email</label>
                <input
                  className={styles['form-input']}
                  type="email"
                  name="email"
                  value={user.email}
                  placeholder="Email"
                  onChange={handleStateChange}
                />
              </div>
              <div>
                <label className={styles['form-label']}>Password</label>
                <input
                  className={styles['form-input']}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleStateChange}
                />
              </div>
              <div>
                <label className={styles['form-label']}>Confirm Password</label>
                <input
                  type="password"
                  className={styles['form-input']}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={user.confirm_password}
                  onChange={handleStateChange}
                />
              </div>
              <div className={styles['form-button']}>
                <NavLink to={'signin'}>
                  <button type="submit" onClick={handleSubmit}>
                    Submit
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </PanelSection>
    </ContentContainer>
  );
};

export default Signup;
