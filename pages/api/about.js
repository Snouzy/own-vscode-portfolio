import data from './about.json';

export const getAbout = () => {
  return data;
};

export default async (req, res) => {
  const data = getAbout();
  await res.json(data);
};
