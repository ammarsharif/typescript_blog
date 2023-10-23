import React from 'react';
import styles from './AddButton.module.css';
import { AddButtonProps } from '../GlobalTypes/GlobalTypes';

const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  width = 20,
  height = 20,
  margin = 2,
  name,
}) => {
  const componentStyle = {
    minWidth: width + 'em',
    minHeight: height + 'em',
    marginTop: margin + 'em',
  };
  return (
    <div>
      <div
        className={`${styles.addCareerBox}`}
        style={componentStyle}
        onClick={onClick}
      >
        <div className={styles.addCareerIcon}>+</div>
        <div className={styles.addCareerText}>Add {name}</div>
      </div>
    </div>
  );
};

export default AddButton;
