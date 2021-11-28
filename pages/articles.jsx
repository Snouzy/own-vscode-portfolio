import useTranslation from 'next-translate/useTranslation';

// import ArticleCard from '../components/ArticleCard';
// import styles from '../styles/ArticlesPage.module.css';

const ArticlesPage = () => {
  const { t } = useTranslation('articles');
  return null;
  // return (
  //   <>
  //     <h3>
  //       {t('title')}
  //       <a href="https://dev.to/itsnitinr" target="_blank" rel="noopener" className={styles.underline}>
  //         dev.to
  //       </a>
  //     </h3>
  //     <div className={styles.container}>
  //       {articles.map((article) => (
  //         <ArticleCard key={article.id} article={article} />
  //       ))}
  //     </div>
  //   </>
  // );
};

export default ArticlesPage;
