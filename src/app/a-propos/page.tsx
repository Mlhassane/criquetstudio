'use client'
import { Leaf, GraduationCap, Apple, Users, Target, Heart, Globe, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Link from 'next/link';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  scale: 1.02,
  transition: { duration: 0.2 }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AboutPage() {
  useEffect(() => {
    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Hero Section with animated background */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative text-center mb-20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-3xl transform -skew-y-2 -z-10"></div>
            <div className="relative py-16 px-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-950"
              >
                Pourquoi Criquet Broadcast ?
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed"
              >
                Le criquet incarne notre vision : l'agilité dans le traitement de l'information, 
                la proximité avec les réalités locales, et l'engagement pour une transformation sociale durable.
              </motion.p>
          </div>
          </motion.div>

          {/* Notre Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 transform hover:scale-[1.01] transition-transform duration-300">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-950"
              >
                Notre Mission
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 leading-relaxed mb-8 text-lg"
              >
                Créer un espace d'information et de sensibilisation de qualité, ancré dans nos réalités, 
                accessible à toutes et tous. Nous croyons à un journalisme constructif, humain et utile pour la société.
              </motion.p>
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-8"
              >
                <ValueCard
                  icon={<Target className="h-8 w-8" />}
                  title="Journalisme Constructif"
                  description="Une approche positive qui met en avant les solutions et les initiatives qui font avancer la société"
                />
                <ValueCard
                  icon={<Heart className="h-8 w-8" />}
                  title="Journalisme Humain"
                  description="Des récits authentiques qui donnent la parole aux acteurs du changement"
                />
                <ValueCard
                  icon={<Newspaper className="h-8 w-8" />}
                  title="Journalisme Utile"
                  description="Une information qui sert concrètement la communauté et contribue à son développement"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Nos Thématiques Clés */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-950"
            >
              Nos Thématiques Clés
            </motion.h2>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              <ServiceCard
                icon={<Leaf className="h-8 w-8" />}
                title="L'Environnement"
                description="Nous racontons les histoires de résilience climatique, les initiatives locales de préservation, et les voix qui agissent pour un Niger plus vert."
              />
              <ServiceCard
                icon={<GraduationCap className="h-8 w-8" />}
                title="L'Éducation des Jeunes"
                description="À travers des formats courts et pédagogiques, nous mettons en lumière des parcours inspirants, des talents, et des solutions pour mieux apprendre."
              />
              <ServiceCard
                icon={<Apple className="h-8 w-8" />}
                title="La Nutrition"
                description="En collaboration avec des experts, nous sensibilisons à de meilleures habitudes alimentaires et valorisons les produits locaux."
              />
              <ServiceCard
                icon={<Users className="h-8 w-8" />}
                title="L'Impact des Organisations"
                description="Nous donnons la parole aux ONG, associations et institutions qui œuvrent au quotidien pour améliorer les conditions de vie des populations."
              />
            </motion.div>
          </motion.div>

          {/* Notre Approche */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 transform hover:scale-[1.01] transition-transform duration-300">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600"
              >
                Notre Approche
              </motion.h2>
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-8"
              >
                <ValueCard
                  icon={<Globe className="h-8 w-8" />}
                  title="Proximité"
                  description="Une couverture ancrée dans les réalités locales, au plus près des communautés"
                />
              <ValueCard
                icon={<Target className="h-8 w-8" />}
                  title="Agilité"
                  description="Un traitement rapide et pertinent de l'information, adapté aux besoins de notre audience"
              />
              <ValueCard
                icon={<Heart className="h-8 w-8" />}
                  title="Engagement"
                  description="Un engagement fort pour une transformation sociale durable et positive"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      variants={itemAnimation}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="bg-gradient-to-br from-white to-gray-50 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </motion.div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={cardHover}
      className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:border-gray-100"
    >
      <div className="text-gray-600 mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center group-hover:text-gray-600">
        {icon}
    </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center group-hover:text-gray-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-center">
        {description}
      </p>
    </motion.div>
  );
}