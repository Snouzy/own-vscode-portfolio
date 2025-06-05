import LeadMagnetForm from '../components/LeadMagnetForm';

const PromptsPage = () => {
  return (
    <LeadMagnetForm
      title="Récupère tes prompts gratuits"
      description="Tu as écrit 'prompt' en commentaire ? Parfait ! Saisis ton email ci-dessous pour recevoir ma liste de prompts ChatGPT/Claude gratuite."
      buttonText="Récupère tes prompts"
      successLink="https://docs.google.com/document/d/1ocuwYk2cT5UDQmhrZKhLvkzq81SsFgcX"
      successLinkText="📄 Ma liste de prompts gratuits"
    />
  );
};

export default PromptsPage;