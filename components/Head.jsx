import Head from 'next/head';

const CustomHead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Mathias Bradiceanu is a front-end web developer building websites and applications in React.JS and Typescript" />
      <meta name="keywords" content="strasbourg, freelance strasbourg, react.js, strasbourg react, strasbourg react-js, strasbourg typescript, strasbourg react js, strasbourg javascript" />
      <meta property="og:title" content="Bradiceanu Mathias's Portfolio" />
      <meta property="og:description" content="A front-end developer building websites in React.JS and Typescript." />
      <meta property="og:image" content="https://imgur.com/4zi5KkQ.png" />
      <meta property="og:url" content="https://snouzy.com" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default CustomHead;

CustomHead.defaultProps = {
  title: 'Mathias Bradiceanu',
};
