import { useState } from 'react'
import logo from '../../assets/DigiTaratasy_black.svg'
import DocumentForm from '../forms/DocumentForm'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg">
      <nav className="fixed top-0 left-0 right-0  px-6 p-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <div className="text-2xl font-bold text-white">Digi
          <span className="text-blue-500">Taratasy</span></div>
        </div>
        <div className="flex gap-4">
        <a href="/login"> <button className="text-white font-bold btn hover:bg-blue-500">Se connecter</button></a>  
        </div>
      </nav>

      <main className="pt-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Faciliter l'accès</h1>
          <h1 className="text-5xl font-bold text-blue-500 mb-8">aux documents administratifs</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
            Créez, téléchargez et gérez facilement vos actes de naissance, mariage, décès, et plus encore, en toute sécurité.
          </p>
         
        </div>

        <div className="grid grid-cols-1  md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto pb-20">
          {[

            {
              title: "Acte de naissance",
              description: "Gagnez du temps en demandant votre livret de famille en ligne."
              ,io:'naissance' 
            },
            {
              title: "Acte de décès",
              description: "Générez un acte de décès pour démarches administratives."
              ,io:"decès",
            },
            {
              title: "Copie",
              description: "Générez un copie administratives."
              ,io:'copie'
            }
          ].map((service, index) => (
            <button
              key={index}
              onClick={() => navigate(`/${service.io}`)}
              className="bg-white/5 p-8 rounded-xl text-left hover:bg-white/10 transition-colors block"
            >
              <div className="text-3xl text-blue-500 mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </button>
          ))}
        </div>
      </main>

      {showForm && (
        <DocumentForm 
          serviceType={selectedService} 
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}


export default Home;