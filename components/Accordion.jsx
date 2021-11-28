import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import styles from '../styles/Accordion.module.css';

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const renderContent = React.useCallback(() =>
    data.map((item, index) => {
      const showDescription = index === activeIndex ? 'show-description' : '';
      const ariaExpanded = index === activeIndex ? 'true' : 'false';
      const fontWeightBold = index === activeIndex ? 'font-weight-bold' : '';

      return (
        <AccordionItem
          showDescription={showDescription}
          ariaExpanded={ariaExpanded}
          fontWeightBold={fontWeightBold}
          item={item}
          index={index}
          key={item.id}
          onClick={() => {
            setActiveIndex(index === activeIndex ? null : index);
          }}
        />
      );
    }, [])
  );

  return (
    <div className={styles.faq}>
      <dl className={styles.faq__list}>{renderContent()}</dl>
    </div>
  );
};

export default Accordion;
