import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import styles from '../styles/Accordion.module.css';

const LinkComponent = ({ children }) => {
  return (
    <Link href={children}>
      <a href={children} rel="noopener" target="_blank" className={styles.underline}>
        {children}
      </a>
    </Link>
  );
};

const AccordionItem = ({ showDescription, ariaExpanded, fontWeightBold, item, index, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.faq__question} key={item.question}>
      <dt>
        <button aria-expanded={ariaExpanded} aria-controls={`faq${index + 1}_desc`} className={`${styles['faq__question-button']} ${fontWeightBold ? styles['font-weight-bold'] : ''}`} onClick={onClick}>
          {t(`about:${item.name}.title`)}
        </button>
      </dt>
      <dd>
        <p id={`faq${index + 1}_desc`} className={`${styles.faq__desc} ${showDescription ? styles['show-description'] : styles['dont-show-description']}`}>
          <Trans i18nKey={`about:${item.name}.description`} components={[<br />, <LinkComponent />]} />
          {/* {t(`about:${item.name}.description`)} */}
        </p>
      </dd>
    </div>
  );
};

export default AccordionItem;
