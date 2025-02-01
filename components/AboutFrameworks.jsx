import React from 'react';
import Link from 'next/link';

import AboutCard from './AboutCard';
import styles from '../styles/AboutPage.module.css';

const AboutLanguages = ({ data }) => {
  return (
    <AboutCard title={data.title}>
      <ul style={{ marginLeft: '1rem' }} className={styles.code}>
        {data.links.map((link) => (
          <li key={link.name}>
            <Link href={link.link || ''} legacyBehavior>
              <a href={link.link || ''} rel="noopener" target="_blank" className={styles.line}>
                {link.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </AboutCard>
  );
};

export default AboutLanguages;
