import { axiosGet } from '../http'

const names = process.env.NEXT_PUBLIC_GITHUB_USERNAME.split(' ');

export const getRepos = () => {

  const entities = await Promise.all(
    names.map(async (name) => {
      const all = Promise.all([axiosGet(`https://api.github.com/users/${name}`), axiosGet(`https://api.github.com/users/${name}/repos?sort=created_at&per_page=${process.env.NEXT_PUBLIC_GITHUB_REPOS_LENGTH}`)]);

      const entity = {
        user: await all[0].json(),
        repos: await all[1].json(),
      };

      return entity;
    })
  );

  return entities;
}
