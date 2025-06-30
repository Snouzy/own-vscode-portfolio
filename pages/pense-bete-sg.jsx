import { useEffect } from 'react';

const PenseBeteSG = () => {
  useEffect(() => {
    window.location.href = 'https://frenchieglutenfree.systeme.io/pense-bete-sg';
  }, []);

  return <p>Redirection vers le pense-bête sans gluten...</p>;
};

export default PenseBeteSG;