import { useState } from 'react'

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">DigiTaratasy</div>
        <div className="flex gap-4">
          <a href="/login" className="px-4 py-2 text-white border border-white rounded-lg hover:bg-white/10 transition-colors">
            Se connecter
          </a>
        </div>
      </nav>

      <main className="pt-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Faciliter l'accès</h1>
          <h1 className="text-5xl font-bold text-blue-500 mb-8">aux documents administratifs</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
            Créez, téléchargez et gérez facilement vos actes de naissance, mariage, décès, et plus encore, en toute sécurité.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href={isAuthenticated ? "/documents" : "/login"}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Demander un document
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto pb-20">
          {[
            {
              title: "Acte de mariage",
              description: "Demandez votre acte de mariage en ligne, simple et rapide."
            },
            {
              title: "Acte de naissance",
              description: "Obtenez un extrait ou une copie intégrale de votre acte de naissance."
            },
            {
              title: "Carte d'identité nationale",
              description: "Pré-demande et suivi de fabrication de votre CIN."
            },
            {
              title: "Livret de famille",
              description: "Gagnez du temps en demandant votre livret de famille en ligne."
            },
            {
              title: "Acte de décès",
              description: "Générez un acte de décès pour démarches administratives."
            },
            {
              title: "Acte de divorce",
              description: "Générez un acte de divorce pour démarches administratives."
            }
          ].map((service, index) => (
            <a
              key={index}
              href={isAuthenticated ? `/services/${service.title.toLowerCase()}` : "/login"}
              className="bg-white/5 p-8 rounded-xl text-left hover:bg-white/10 transition-colors block"
            >
              <div className="text-3xl text-blue-500 mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}


export default Home;