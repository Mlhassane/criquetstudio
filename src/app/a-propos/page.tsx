import Link from "next/link"
import Image from "next/image"
import SearchBar from "@/components/search-bar"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}


      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* <div className="mb-8">
          
            <h1 className="text-3xl font-bold mt-4 mb-2">À propos de Niger Info</h1>
            <p className="text-gray-500">Découvrez notre histoire et notre mission</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-xl font-bold mb-4">Notre mission</h2>
              <p className="text-gray-600 mb-4">
                Niger Info a été fondé en 2020 avec une mission claire : fournir une information fiable, équilibrée et accessible sur l'actualité nigérienne et internationale.
              </p>
              <p className="text-gray-600 mb-4">
                Dans un monde où la désinformation se propage rapidement, nous nous engageons à vérifier rigoureusement nos sources et à présenter les faits avec précision et impartialité.
              </p>
              <p className="text-gray-600">
                Notre équipe de journalistes professionnels travaille chaque jour pour couvrir les événements qui façonnent notre pays et notre monde, avec un accent particulier sur les enjeux qui touchent directement les Nigériens.
              </p>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="L'équipe de Niger Info"
                className="rounded-lg"
              />
            </div>
          </div> */}

          {/* <div className="border-t border-b py-12 my-12">
            <h2 className="text-xl font-bold mb-6 text-center">Nos valeurs</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Intégrité</h3>
                <p className="text-gray-600">
                  Nous nous engageons à rapporter les faits avec honnêteté et transparence, sans céder aux pressions politiques ou commerciales.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Diversité</h3>
                <p className="text-gray-600">
                  Nous valorisons la diversité des perspectives et nous efforçons de représenter toutes les voix de la société nigérienne.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Nous embrassons les nouvelles technologies pour rendre l'information plus accessible et engageante pour tous les Nigériens.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">Notre équipe</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "Mahamne Lawaly", role: "Chriniqueur tech", image: "/placeholder.svg?height=300&width=300" },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    width={200}
                    height={200}
                    alt={member.name}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Nous contacter</h2>
            <p className="text-gray-600 mb-4">
              Vous avez des questions, des suggestions ou souhaitez nous signaler une information ? N'hésitez pas à nous contacter.
            </p>
            <Link
              href="/contact"
              className="inline-block px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Contactez-nous
            </Link>
          </div> */}
        </div>
      </main>

     </div>
    )
 }