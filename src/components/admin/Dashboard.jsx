import { GiDeadHead } from "react-icons/gi"; 
import { BsFillHeartbreakFill } from "react-icons/bs"; 
import { GiLovers } from "react-icons/gi"; 
import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const navigate = useNavigate();

  // Vérification de l'authentification admin
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  // Gestion de la déconnexion
  const handleLogout = () => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous serez déconnecté de l'administration!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, déconnecter!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('isAdmin');
        navigate('/login');
        Swal.fire({
          title: 'Déconnexion réussie!',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  };

  // Gérer la visibilité de la sidebar sur mobile
  useEffect(() => {
    if (!isMobileMenuOpen && !isSidebarOpen) {
      setIsSidebarOpen(true); // Assure que la sidebar est ouverte par défaut si le menu mobile est fermé
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {/* Bouton pour ouvrir/fermer la sidebar sur mobile */}
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="logo-sidebar"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <a href="#" className="flex ms-2 md:me-24">
                <img
                  src="/src/assets/DigiTaratasy_black.svg"
                  className={`h-8 me-1 duration-500 ${!isSidebarOpen && "rotate-[360deg]"}`}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Digi<span className="text-blue-400">Taratasy</span>
                </span>
              </a>
            </div>

            <div className="flex items-center">
              <div className="relative flex items-center ms-3">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={toggleUserMenu}
                  aria-expanded={isUserMenuOpen}
                >
                  <span className="sr-only">Open user menu</span>

      
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-10 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {localStorage.getItem('userName') || 'Administrateur'}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                        {localStorage.getItem('userEmail')}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <Link 
                          to="/admin"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                          <span className="material-icons">dashboard</span>
                        
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Paramètres
                        </a>
                      </li>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <FaSignOutAlt className="mr-2" />
                          Se déconnecter
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen pt-20 transition-all duration-300 ease-in-out bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
          {/* Top Navigation Section */}
          <div>
            <ul className="space-y-2 font-medium">
              <li>
                <Link 
                  to="/admin"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="material-icons">dashboard</span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Tableau de bord</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/notifications" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="material-icons">notifications</span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Notifications</span>
                </Link>
              </li>
            </ul>

            {/* Separator */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

            {/* Documents Section */}
            <ul className="space-y-2 font-medium">
             
              <li className={`text-gray-500 dark:text-gray-400 text-sm px-2 py-1 ${!isSidebarOpen && 'hidden'}`}>DOCUMENTS</li>
              <li>
                <Link 
                  to="/admin/acte-de-naissance" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="material-icons">assignment</span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Acte de naissance</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/carte-d-identite" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="material-icons">badge</span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Carte d&apos;identité</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/livret-de-famille" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="material-icons">family_restroom</span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Livret de famille</span>
                </Link>
              </li>



              <li>
                <Link 
                  to="/admin/acte-de-naissance" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span> <GiLovers /> </span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Acte de mariage</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/carte-d-identite" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span > <BsFillHeartbreakFill /></span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Acte de divorce</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/livret-de-famille" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span> <GiDeadHead /> </span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Acte de decès</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* User Section - Centered */}
          <div className="my-4">
            {/* Separator */}
            <div className="mb-4 border-t border-gray-200 dark:border-gray-700"></div>

            <ul className="space-y-2 font-medium">
              <li className={`text-gray-500 dark:text-gray-400 text-sm px-2 py-1 ${!isSidebarOpen && 'hidden'}`}>UTILISATEUR</li>
              <li>
                <Link 
                  to="/admin/profile" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="material-icons">person</span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Profile</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/utilisateurs" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="material-icons">group</span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Utilisateurs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Bottom Settings Section */}
          <div>
            {/* Separator */}
            <div className="mb-4 border-t border-gray-200 dark:border-gray-700"></div>

            <ul className="space-y-2 font-medium">
              <li>
                <Link 
                  to="/admin/parametres" 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="material-icons">settings</span>
                  <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Se Deconnecter</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Bouton pour réduire/afficher la sidebar */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 p-2 bg-gray-700 items-center justify-center flex text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out sm:block ${
          isSidebarOpen ? 'left-60 bottom-10' : 'left-12 bottom-10'
        }`}
      >
        <span className="material-icons">
          {isSidebarOpen ? 'chevron_left' : 'chevron_right'}
        </span>
      </button>

      {/* Contenu principal */}
      <div
        className={`p-4 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'sm:ml-64' : 'sm:ml-16'
        }`}
      >
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
