'use client'
import { useState, ChangeEvent, MouseEvent } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const AnimatedIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="transform transition-transform duration-300 group-hover:scale-110">
    {children}
  </div>
);

const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const TikTokIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const LinkedInIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SocialIcon = ({ href, icon: Icon, color }: { href: string; icon: any; color: string }) => (
  <Link 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group p-2 rounded-full transition-all duration-300 hover:bg-${color}-100`}
  >
    <AnimatedIcon>
      <Icon className={`h-6 w-6 text-${color}-500 group-hover:text-${color}-600`} />
    </AnimatedIcon>
  </Link>
);

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

                {/* Social Media Links */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Suivez-nous</h3>
                  <div className="flex space-x-4">
                    <SocialIcon href="https://www.facebook.com/share/1EgUaU4H5n/" icon={FacebookIcon} color="blue" />
                    <SocialIcon href="https://www.tiktok.com/@criquet_broadcast_studio" icon={TikTokIcon} color="black" />
                    <SocialIcon href="https://www.linkedin.com/posts/criquetbroadcaststudio_paixducagbur-respectavanttout-activity-7334212291971756032-11r5?utm_source=share&utm_medium=member_android&rcm=ACoAACdchA4BtCehRxnsBeZQXFY675IvhHqN-WY" icon={LinkedInIcon} color="blue" />
                    <SocialIcon href="https://www.youtube.com/@CriquetStudio" icon={YoutubeIcon} color="red" />
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