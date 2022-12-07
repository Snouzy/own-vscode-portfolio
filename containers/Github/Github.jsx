import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import GitHubCalendar from 'react-github-calendar';

import RepoCard from '../../components/RepoCard';


import styles from '../../styles/GithubPage.module.css';

const GithubPage = ({ entities }) => {
  const theme = {
    level0: '#161B22',
    level1: '#0e4429',
    level2: '#006d32',
    level3: '#26a641',
    level4: '#39d353',
  };

  const { t } = useTranslation('github');
  return (
    <>
      {entities && entities.length ? (
        entities.map(({ user, repos }) => {
          if (user.message === 'Bad credentials' || repos.message === 'Bad credentials') return null;
          if (user.message && user.documentation_url && repos.message && repos.documentation_url) return <><h3>{t('problem')}</h3><br/><span>{user.message}</span><br/><span>{repos.message}</span></>;
          if (user.message && user.documentation_url) return <h3>{t('problem_user')}</h3>;
          if (repos.message && repos.documentation_url) return <h3>{t('problem_repo')}</h3>;
          return (
            <React.Fragment key={user.id}>
              <div className={styles.user}>
                <div>
                  <Image src={user.avatar_url} className={styles.avatar} alt={user.login} width={50} height={50} />
                  <h3 className={styles.username}>{user.login}</h3>
                </div>
                <div>
                  <h3>{user.public_repos} repos</h3>
                </div>
                <div>
                  <h3>{user.followers} followers</h3>
                </div>
              </div>
              <h2>{t('latest-repos', { count: repos.length })}</h2>
              <div className={styles.container}>
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
              {/* <div className={styles.contributions}>
                <GitHubCalendar username={user.login} theme={theme} hideColorLegend />
              </div> */}
            </React.Fragment>
          );
        })
      ) : (
        <h3>{t('problem')}</h3>
      )}
    </>
  );
};

export default GithubPage;
