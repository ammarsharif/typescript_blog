import React from 'react';
import styles from './RouterPage.module.css';
import ContentContainer from '../ReuseableComponents/ContentContainer/ContentContainer';
import PanelSection from '../ReuseableComponents/PanelSection/PanelSection';
import { NavLink } from 'react-router-dom';

const RouterPage: React.FC = () => {
  return (
    <ContentContainer width={50}>
      <PanelSection>
        <div className={styles['signin-Form']} data-testid="Signin-From">
          <div className={styles['signin_container']}>
            <h3>Router Blog</h3>
            <form className={styles['form-container']}>
              <div className={styles['form-button']}>
                <NavLink to={'/blogslist'}>
                  <button>Blog List</button>
                </NavLink>
              </div>
              <div className={styles['form-button']}>
                <NavLink to={'/'}>
                  <button>Create Blog</button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </PanelSection>
    </ContentContainer>
  );
};

export default RouterPage;
