import { useEffect } from 'react';
  import { useRouter } from 'next/router';
  const getActualUrl = async (code) => {
    // In a real implementation, fetch the actual URL from your database
    return `https://your-actual-destination.com/${code}`;
  };
  export default function Redirect({ actualUrl }) {
    const router = useRouter();
  
    useEffect(() => {
      if (actualUrl) {
        window.location.replace(actualUrl);
      }
    }, [actualUrl]);
  
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', paddingTop: '50px' }}>
        <h1>Redirecting you to your destination...</h1>
        <p>If you are not redirected automatically, <a href={actualUrl} target="_blank" rel="noopener noreferrer">click here</a>.</p>
      </div>
    );
  }
  
  export async function getServerSideProps(context) {
    const { shortCode } = context.params;
    
    // Function to get the actual URL from your database
    const getActualUrl = async (code) => {
      // In a real implementation, fetch the actual URL from your database
      return `https://your-actual-destination.com/${code}`;
    };
  
    const actualUrl = await getActualUrl(shortCode);
  
    return {
      props: { actualUrl },
    };
  }
  
  // pages/api/shortener.js
  export default function handler(req, res) {
    if (req.method === 'POST') {
      const { url } = req.body;
      // Generate a short code and save it to your database
      const shortCode = generateShortCode();
      // Save the mapping of shortCode to url in your database
      
      res.status(200).json({ shortCode });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  
  function generateShortCode() {
    // Implement your short code generation logic here
    return 'abc123'; // This is just a placeholder
  }