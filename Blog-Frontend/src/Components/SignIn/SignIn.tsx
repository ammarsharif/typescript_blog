import React, { useState } from 'react';
import styles from './SignIn.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import PanelSection from '../ReuseableComponents/PanelSection/PanelSection';
import { useNavigate } from 'react-router-dom';
import { BASE_API } from '../../Constants/BrowseRoutes';
import axios from 'axios';

const SignIn: React.FC = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_API}/api/user/login`, user);
      localStorage.setItem('token', response.data.token);
      console.log('SignIn response:', response);
      navigate('/blogs');
    } catch (error) {
      console.error('Unable to Login', error);
      alert('Invalid credentials! Please try again.');
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <ContentContainer width={30}>
      <PanelSection>
        <div className={styles['signin-Form']} data-testid="Signin-From">
          <div className={styles['signin_container']}>
            <h3>SignIn Page</h3>
            <form className={styles['form-container']}>
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
              <div className={styles['form-button']}>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </PanelSection>
    </ContentContainer>
  );
};

export default SignIn;
