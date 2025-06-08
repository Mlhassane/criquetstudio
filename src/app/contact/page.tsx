'use client'
import { useState, ChangeEvent, MouseEvent } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Youtube, Facebook, Linkedin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('invalid-email');
      setIsSubmitting(false);
      return;
    }

    try {
      // Préparation des données email
      const emailData = {
        to: 'sorcidigit@gmail.com',
        from: formData.email,
        subject: `[Contact Criquet Studio] ${formData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #374151; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
              Nouveau message de contact - Criquet Studio
            </h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="font-weight: bold; color: #374151; padding: 8px 0; width: 120px;">Nom:</td>
                  <td style="color: #6b7280; padding: 8px 0;">${formData.name}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #374151; padding: 8px 0;">Email:</td>
                  <td style="color: #6b7280; padding: 8px 0;">${formData.email}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #374151; padding: 8px 0;">Sujet:</td>
                  <td style="color: #6b7280; padding: 8px 0;">${formData.subject}</td>
                </tr>
              </table>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
              <div style="background-color: white; padding: 15px; border-left: 4px solid #3b82f6; border-radius: 4px;">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
              <p>Ce message a été envoyé depuis le formulaire de contact du site Criquet Studio.</p>
              <p>Date: ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        `
      };

      // Simulation d'envoi (remplacer par votre API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Email envoyé vers sorcidigit@gmail.com:', emailData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* En-tête */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2 text-gray-900">Contactez-nous</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous sommes à votre écoute pour toute question ou suggestion. 
              N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Informations de contact */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Nos coordonnées</h2>

                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="bg-gray-200 p-2 rounded-lg mr-4 group-hover:bg-gray-300 transition-colors">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Adresse</p>
                      <p className="text-gray-600 mt-1">Soleil d'Afriques, Niamey, Niger</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gray-200 p-2 rounded-lg mr-4 group-hover:bg-gray-300 transition-colors">
                      <Phone className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Téléphone</p>
                      <a href="tel:+22780172886" className="text-blue-600 hover:text-blue-800 mt-1 block">
                        +227 84483737
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gray-200 p-2 rounded-lg mr-4 group-hover:bg-gray-300 transition-colors">
                      <Mail className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:contact@criquetstudio.com" className="text-blue-600 hover:text-blue-800 mt-1 block">
                        contact@criquetstudio.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Horaires d'ouverture</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lundi - Vendredi:</span>
                      <span className="font-medium text-gray-900">8h00 - 17h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Samedi:</span>
                      <span className="font-medium text-gray-900">9h00 - 13h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimanche:</span>
                      <span className="font-medium text-red-600">Fermé</span>
                    </div>
                  </div>
                </div>

                {/* Ajout des liens sociaux */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.youtube.com/@CriquetStudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Youtube className="h-5 w-5" />
                      <span>YouTube</span>
                    </a>
                    <a
                      href="https://www.facebook.com/share/1EgUaU4H5n/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                      <span>Facebook</span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@criquet_broadcast_studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                      </svg>
                      <span>TikTok</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/posts/criquetbroadcaststudio_paixducagbur-respectavanttout-activity-7334212291971756032-11r5?utm_source=share&utm_medium=member_android&rcm=ACoAACdchA4BtCehRxnsBeZQXFY675IvhHqN-WY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-bold mb-6 text-gray-900">Envoyez-nous un message</h2>
                
                {/* Messages de statut */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Message envoyé avec succès !</p>
                      <p className="text-sm text-green-600 mt-1">Nous vous répondrons dans les plus brefs délais.</p>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Erreur lors de l'envoi</p>
                      <p className="text-sm text-red-600 mt-1">Veuillez vérifier tous les champs et réessayer.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'invalid-email' && (
                  <div className="mb-6 p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email invalide</p>
                      <p className="text-sm text-orange-600 mt-1">Veuillez saisir une adresse email valide.</p>
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Sujet de votre message"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                      placeholder="Décrivez votre demande en détail..."
                      required
                    ></textarea>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                      isSubmitting 
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      'Envoyer le message'
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    * Champs obligatoires • Destinataire: sorcidigit@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}