import styles from '../styles/LayoutSimple.module.css';

const LayoutSimple = ({ children }) => {
  return (
    <div className={styles.root}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default LayoutSimple;
