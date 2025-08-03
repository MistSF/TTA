import React, { useState } from 'react';
import api from '../services/api';

// Le composant reçoit l'ID de l'artisan pour savoir à qui envoyer le message
function ContactForm({ artisanId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    object: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  // Gère les changements dans les champs de saisie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    api.post(`/artisans/${artisanId}/contact`, formData)
      .then(response => {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', object: '', message: '' });
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || "Une erreur est survenue lors de l'envoi du message.";
        setStatus({ submitting: false, success: false, error: errorMessage });
      });
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4 className="card-title">Contacter l'artisan</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Votre nom</label>
            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Votre email</label>
            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="object" className="form-label">Objet</label>
            <input type="text" className="form-control" id="object" name="object" value={formData.object} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Votre message</label>
            <textarea className="form-control" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={status.submitting}>
            {status.submitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </button>

          {/* Affichage des messages de statut */}
          {status.success && <div className="alert alert-success mt-3">Votre message a bien été envoyé !</div>}
          {status.error && <div className="alert alert-danger mt-3">{status.error}</div>}
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
