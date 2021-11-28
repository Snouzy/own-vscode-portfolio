import Titlebar from '../components/Titlebar';
import Sidebar from '../components/Sidebar';
import Explorer from '../components/Explorer';
import Bottombar from '../components/Bottombar';
import Tabsbar from './Tabsbar';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Titlebar />
        <Tabsbar />
      </div>

      <div className={styles.side}>
        <Sidebar />
        <Explorer />
      </div>

      <main className={styles.main}>{children}</main>

      <Bottombar />
    </div>
  );
};

export default Layout;
