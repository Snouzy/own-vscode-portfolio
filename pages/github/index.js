import React from 'react'
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head'
import Github from "../../containers/Github/Github"
const GithubPage = ({ entities }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{`${process.env.NODE_ENV === 'development' ? 'DEV - ' : ''} ${t('seo.github.title')} - ${t('seo.base.title')}`}</title>
        <meta name='description' content={t('seo.github.description')} />
        <meta property='og:title' content={t('seo.github.title')} />
        <meta property='og:description' content={t('seo.github.description')} />
        <meta property='og:image' content='' />
      </Head>
      <Github entities={entities} />
    </>
  )
}

export async function getStaticProps() {
  const names = process.env.NEXT_PUBLIC_GITHUB_USERNAME.split(' ');

  try {
    const entities = await Promise.all(
      names.map(async (name) => {
        const all = await Promise.all([await fetch(`https://api.github.com/users/${name}`), await fetch(`https://api.github.com/users/${name}/repos?sort=created_at&per_page=${process.env.NEXT_PUBLIC_GITHUB_REPOS_LENGTH}`)]);

        const entity = {
          user: await all[0].json(),
          repos: await all[1].json(),
        };

        return entity;
      })
    );

    return {
      props: { title: 'Github', entities },
    };
  } catch (err) {
    console.error('err:', err)
    return { props: { title: 'Github', entities: [] } };
  }
}

export default GithubPage