'use client'
import { useState, ChangeEvent, MouseEvent, Suspense } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Youtube, Facebook, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";

// Variants d'animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
        to: 'criquetbroadcast@gmail.com',
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
      
      console.log('Email envoyé vers criquetbroadcast@gmail.com:', emailData);
      
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
    <Suspense>
      <main className="p-6 max-w-7xl mx-auto fade-in">
        <div className="mb-16 slide-down">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-indigo-800 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour à l'accueil
          </Link>
          <div className="text-center mt-12">
            <h1 className="text-5xl font-bold mb-6 text-primary tracking-tight">
              Contactez-nous
            </h1>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              Nous sommes à votre écoute pour toute question ou suggestion. 
              N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-8"></div>
          </div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          {/* Informations de contact */}
          <motion.div 
            variants={itemAnimation}
            className="order-2 md:order-1"
          >
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <motion.h2 
                className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                variants={itemAnimation}
              >
                Nos coordonnées
              </motion.h2>

              <motion.div 
                variants={staggerContainer}
                className="space-y-6"
              >
                {/* Coordonnées avec animations */}
                <motion.div 
                  variants={itemAnimation}
                  className="flex items-start group hover:bg-gray-50 p-3 rounded-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-black to-gray-950 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Adresse</p>
                    <p className="text-gray-600 mt-1">
                      Soleil d'Afriques, Niamey, Niger
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemAnimation}
                  className="flex items-start group hover:bg-gray-50 p-3 rounded-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-black to-gray-950 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Téléphone</p>
                    <a href="tel:+22780172886" className="text-primary hover:text-red-700 mt-1 block transition-colors">
                      +227 84483737
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemAnimation}
                  className="flex items-start group hover:bg-gray-50 p-3 rounded-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-black to-gray-950 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href="mailto:contact@criquetstudio.com" className="text-primary hover:text-red-700 mt-1 block transition-colors">
                      criquetbroadcast@gmail.com
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Horaires avec animation */}
              <motion.div 
                variants={itemAnimation}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-black to-gray-950 p-2 rounded-lg mr-3">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Horaires d'ouverture
                  </h3>
                </div>
                <motion.div 
                  variants={staggerContainer}
                  className="space-y-3 text-sm"
                >
                  <motion.div variants={itemAnimation} className="flex justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <span className="text-gray-600">Lundi - Vendredi:</span>
                    <span className="font-medium text-gray-900">8h00 - 17h00</span>
                  </motion.div>
                  <motion.div variants={itemAnimation} className="flex justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <span className="text-gray-600">Samedi:</span>
                    <span className="font-medium text-gray-900">9h00 - 13h00</span>
                  </motion.div>
                  <motion.div variants={itemAnimation} className="flex justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <span className="text-gray-600">Dimanche:</span>
                    <span className="font-medium text-red-600">Fermé</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Réseaux sociaux avec animations */}
              <motion.div 
                variants={itemAnimation}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-4">
                  Suivez-nous
                </h3>
                <motion.div 
                  variants={staggerContainer}
                  className="grid grid-cols-2 gap-3"
                >
                  <motion.a
                    variants={itemAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.youtube.com/@CriquetStudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-400 to-red-700 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all"
                  >
                    <Youtube className="h-5 w-5" />
                    <span>YouTube</span>
                  </motion.a>
                  <motion.a
                    variants={itemAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.facebook.com/share/1EgUaU4H5n/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all"
                  >
                    <Facebook className="h-5 w-5" />
                    <span>Facebook</span>
                  </motion.a>
                  <motion.a
                    variants={itemAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.tiktok.com/@criquet_broadcast_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                    </svg>
                    <span>TikTok</span>
                  </motion.a>
                  <motion.a
                    variants={itemAnimation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/posts/criquetbroadcaststudio_paixducagbur-respectavanttout-activity-7334212291971756032-11r5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-700 to-blue-800 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Formulaire avec animations */}
          <motion.div 
            variants={itemAnimation}
            className="order-1 md:order-2"
          >
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <motion.h2 
                className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                variants={itemAnimation}
              >
                Envoyez-nous un message
              </motion.h2>

              {/* Messages de statut avec animations */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: submitStatus ? 1 : 0, y: submitStatus ? 0 : -10 }}
                transition={{ duration: 0.3 }}
              >
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Message envoyé avec succès !</p>
                      <p className="text-sm text-green-600 mt-1">Nous vous répondrons dans les plus brefs délais.</p>
                    </div>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center"
                  >
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Erreur lors de l'envoi</p>
                      <p className="text-sm text-red-600 mt-1">Veuillez vérifier tous les champs et réessayer.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'invalid-email' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-xl flex items-center"
                  >
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email invalide</p>
                      <p className="text-sm text-orange-600 mt-1">Veuillez saisir une adresse email valide.</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.form 
                variants={staggerContainer}
                className="space-y-5"
              >
                <motion.div variants={itemAnimation}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="Votre nom complet"
                    required
                  />
                </motion.div>

                <motion.div variants={itemAnimation}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="votre@email.com"
                    required
                  />
                </motion.div>

                <motion.div variants={itemAnimation}>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-gray-400"
                    placeholder="Sujet de votre message"
                    required
                  />
                </motion.div>

                <motion.div variants={itemAnimation}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 hover:border-gray-400 resize-vertical"
                    placeholder="Décrivez votre demande en détail..."
                    required
                  ></textarea>
                </motion.div>

                <motion.button
                  variants={itemAnimation}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-black to-gray-950 text-white hover:shadow-lg hover:shadow-red-100'
                  }`}
                >
                  {isSubmitting ? (
                    <motion.span 
                      className="flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                     
                    </motion.span>
                  ) : (
                    'Envoyer le message'
                  )}
                </motion.button>
                
                <motion.p 
                  variants={itemAnimation}
                  className="text-xs text-gray-500 text-center"
                >
                  * Champs obligatoires • Destinataire: criquetbroadcast@gmail.com
                </motion.p>
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </Suspense>
  );
}