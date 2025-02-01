import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import styles from '../styles/SolopreneurRessourcesPage.module.css';

const SolopreneurRessourcesPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response.json();
    },
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Ressources pour solopreneurs</h1>
        <p className={styles.description}>
          Reçois gratuitement ma sélection d'outils et de ressources pour lancer et développer ton business en solo.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Ton nom</label>
            <input
              id="name"
              type="text"
              className={styles.input}
              {...register('name', { required: 'Ton nom est requis' })}
            />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Ton email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              {...register('email', { 
                required: 'Ton email est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide'
                }
              })}
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className={styles.spinner}></span>
            ) : (
              <>
                <svg className={styles.icon} width="16" height="16" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M8 2L2 5v6l6 3 6-3V5L8 2zm0 11.5L3 10.7V5.8l5 2.5v5.2zm1-6.9L4 4.3l4-2 4 2-5 2.3zm4 3.4L9 8.7v5.2l4-1.8V6.8z"/>
                </svg>
                Reçois tes ressources
              </>
            )}
          </button>

          {mutation.isSuccess && (
            <div className={styles.success}>
              Merci ! Vérifie ta boîte mail pour recevoir tes ressources.
            </div>
          )}
          
          {mutation.isError && (
            <div className={styles.error}>
              Une erreur est survenue. Essaie à nouveau.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SolopreneurRessourcesPage;