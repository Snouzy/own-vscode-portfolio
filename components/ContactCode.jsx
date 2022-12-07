import styles from '../styles/ContactCode.module.css';

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      <p className={styles.line}>
        &nbsp;&nbsp;&nbsp;website:{' '}
        <a href="/" target="_blank" rel="noopener">
          snouzyyyyyyyyyy
        </a>
        ;
      </p>
      <p className={styles.line}>
        &nbsp;&nbsp;&nbsp;email:{' '}
        <a href="mailto:contact@snouzy.com" target="_blank" rel="noopener">
          contact@snouzy.com
        </a>
        ;
      </p>
      <p className={styles.line}>
        &nbsp;&nbsp;&nbsp;github(perso):{' '}
        <a href="https://github.com/Snouzy" target="_blank" rel="noopener">
          Snouzy
        </a>
        ;
      </p>
      <p className={styles.line}>
        &nbsp;&nbsp;&nbsp;linkedin:{' '}
        <a href="https://www.linkedin.com/in/mathias-bradiceanu-3410b1ab/" target="_blank" rel="noopener">
          MathiasBradiceanu
        </a>
        ;
      </p>
      <p className={styles.line}>
        &nbsp;&nbsp;&nbsp;twitter:{' '}
        <a href="https://twitter.com/BradiceanuM" target="_blank" rel="noopener">
          snz
        </a>
        ;
      </p>
      <p className={styles.line}>
        &nbsp;&nbsp;&nbsp;instagram:{' '}
        <a href="https://www.instagram.com/snz_mat/" target="_blank" rel="noopener">
          snz_mat
        </a>
        ;
      </p>
      <p className={styles.line}>
        &nbsp;&nbsp;&nbsp;facebook:{' '}
        <a href="https://www.facebook.com/mathias.bradiceanu/" target="_blank" rel="noopener">
          mathiasbradiceanu
        </a>
        ;
      </p>

      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
