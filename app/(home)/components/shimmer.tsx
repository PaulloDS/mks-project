// components/Shimmer.tsx
import React from 'react';
import styles from '../components/shimmer.module.scss';

const Shimmer: React.FC = () => {
  return (
    <div className={styles['shimmer-wrapper']}>
      <div className={styles['shimmer-effect']} />
    </div>
  );
};

export default Shimmer;