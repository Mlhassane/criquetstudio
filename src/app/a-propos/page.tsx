import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeInOut" },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const ValueCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <motion.div variants={fadeIn} className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="bg-gradient-to-br from-red-400 to-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </motion.div>
);

const TeamMemberCard = ({ name, role, image }: { name: string; role: string; image: string }) => (
  <motion.div variants={fadeIn} className="text-center">
    <Image
      src={image || "/placeholder.svg"}
      width={200}
      height={200}
      alt={name}
      className="rounded-full mx-auto mb-4 object-cover shadow-md"
    />
    <h3 className="font-bold text-lg">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </motion.div>
);

export default function AboutPage() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="min-h-screen bg-gray-50 py-16"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={fadeIn} className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Notre Histoire</h1>
          <p className="text-gray-600 text-lg">
            Découvrez comment Niger Info est devenu une source d'information de confiance au Niger.
          </p>
        </motion.div>

        <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notre Mission</h2>
            <p className="text-gray-700 mb-4">
              Niger Info a été fondé en 2020 avec une mission claire : fournir une information fiable, équilibrée et accessible sur l'actualité nigérienne et internationale.
            </p>
            <p className="text-gray-700 mb-4">
              Dans un monde où la désinformation se propage rapidement, nous nous engageons à vérifier rigoureusement nos sources et à présenter les faits avec précision et impartialité.
            </p>
            <p className="text-gray-700">
              Notre équipe de journalistes professionnels travaille chaque jour pour couvrir les événements qui façonnent notre pays et notre monde, avec un accent particulier sur les enjeux qui touchent directement les Nigériens.
            </p>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/placeholder.svg?height=400&width=600"
              width={600}
              height={400}
              alt="L'équipe de Niger Info"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="border-t border-b py-16 my-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              title="Intégrité"
              description="Nous nous engageons à rapporter les faits avec honnêteté et transparence, sans céder aux pressions politiques ou commerciales."
              icon={
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />
            <ValueCard
              title="Diversité"
              description="Nous valorisons la diversité des perspectives et nous efforçons de représenter toutes les voix de la société nigérienne."
              icon={
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <ValueCard
              title="Innovation"
              description="Nous embrassons les nouvelles technologies pour rendre l'information plus accessible et engageante pour tous les Nigériens."
              icon={
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Notre Équipe</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Mahamne Lawaly", role: "Chroniqueur tech", image: "/placeholder.svg?height=300&width=300" },
              { name: "Aichatou Moussa", role: "Journaliste politique", image: "/placeholder.svg?height=300&width=300" },
              { name: "Ousmane Ali", role: "Rédacteur en chef", image: "/placeholder.svg?height=300&width=300" },
              { name: "Fatima Diallo", role: "Correspondante régionale", image: "/placeholder.svg?height=300&width=300" },
            ].map((member, index) => (
              <TeamMemberCard key={index} name={member.name} role={member.role} image={member.image} />
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-gradient-to-r from-red-100 to-red-200 p-12 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nous Contacter</h2>
          <p className="text-gray-700 mb-6">
            Vous avez des questions, des suggestions ou souhaitez nous signaler une information ? N'hésitez pas à nous contacter.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Contactez-nous
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}