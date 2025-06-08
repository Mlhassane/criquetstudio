'use client'
import { Camera, Video, Radio, Music, Users, Award, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">À Propos de Criquet Brodcast Studio</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une société de production audiovisuelle passionnée, dédiée à donner vie à vos projets créatifs avec excellence et innovation.
            </p>
          </div>

          {/* Notre Mission */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Chez Criquet Studio, nous nous engageons à fournir des services audiovisuels de haute qualité, 
                en combinant créativité, expertise technique et professionnalisme. Notre objectif est de 
                transformer vos idées en contenus visuels captivants qui racontent votre histoire de manière unique.
              </p>
            </div>
          </div>

          {/* Nos Services */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nos Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                icon={<Camera className="h-8 w-8" />}
                title="Production Photo"
                description="Services photographiques professionnels pour vos événements et projets"
              />
              <ServiceCard
                icon={<Video className="h-8 w-8" />}
                title="Production Vidéo"
                description="Réalisation de films, documentaires et contenus vidéo créatifs"
              />
           
              <ServiceCard
                icon={<Music className="h-8 w-8" />}
                title="Studio d'Enregistrement"
                description="Enregistrement professionnel pour vos projets musicaux"
              />
            </div>
          </div>

          {/* Nos Valeurs */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nos Valeurs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <ValueCard
                icon={<Target className="h-8 w-8" />}
                title="Excellence"
                description="Nous visons l'excellence dans chaque projet, en garantissant des résultats de haute qualité"
              />
              <ValueCard
                icon={<Heart className="h-8 w-8" />}
                title="Passion"
                description="Notre passion pour l'audiovisuel se reflète dans chaque création"
              />
              <ValueCard
                icon={<Users className="h-8 w-8" />}
                title="Collaboration"
                description="Nous croyons en la force du travail d'équipe et de la collaboration créative"
              />
            </div>
          </div>

          {/* Notre Équipe */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Notre Équipe</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Une équipe passionnée de professionnels de l'audiovisuel, dédiée à donner vie à vos projets 
              avec créativité et expertise technique.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg text-center">
      <div className="text-blue-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}