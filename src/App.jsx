import {  Routes, Route } from 'react-router-dom'
import Home from './components/clients/home'
import Login from './components/auth/login'
import Dashboard from './components/admin/Dashboard'
import Users from './pages/Users'
import Notifie from './pages/Notifications'
import DashboardHome from './components/admin/DashboardHome'
import DocumentForm from './components/forms/DocumentForm'
import DocumentForm3 from './components/forms/DocumentForm3'

import DocumentForm2 from './components/forms/DocumentsForm2'
import Confirmation from './components/clients/Confirmation'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demande/:serviceType" element={<DocumentForm />} />
          <Route path="login" element = { <Login /> }/>
          
           {/*<Route path="*" element={<Navigate to="/" />} />*/}

          <Route path="admin" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="notifications" element={<Notifie />} />
            <Route path="utilisateurs" element={<Users />} />
            <Route path="profile" element={<Profile />} />
    
          </Route>

          <Route>
            <Route path='naissance' element={<DocumentForm serviceType="naissance"/>} />
            <Route path='mariage' element={<DocumentForm serviceType="mariage"/>} />
            <Route path='decès' element={<DocumentForm serviceType="decès"/>} />
            <Route path='copie' element={<DocumentForm serviceType="copie"/>} />
            <Route path='cin' element={<DocumentForm serviceType="cin"/>} />
            <Route path='divorce' element={<DocumentForm serviceType="divorce"/>} />
            <Route path='legalise' element={<DocumentForm serviceType="legalise"/>} />
          </Route>

          <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  )
}


// import { useState, useEffect } from 'react';

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const toggleUserMenu = () => {
//     setIsUserMenuOpen(!isUserMenuOpen);
//   };

//   // Gérer la visibilité de la sidebar sur mobile
//   useEffect(() => {
//     if (!isMobileMenuOpen && !isSidebarOpen) {
//       setIsSidebarOpen(true); // Assure que la sidebar est ouverte par défaut si le menu mobile est fermé
//     }
//   }, [isMobileMenuOpen]);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Navbar */}
//       <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//         <div className="px-3 py-3 lg:px-5 lg:pl-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center justify-start rtl:justify-end">
//               {/* Bouton pour ouvrir/fermer la sidebar sur mobile */}
//               <button
//                 onClick={toggleMobileMenu}
//                 type="button"
//                 className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                 aria-controls="logo-sidebar"
//                 aria-expanded={isMobileMenuOpen}
//               >
//                 <span className="sr-only">Open sidebar</span>
//                 <svg
//                   className="w-6 h-6"
//                   aria-hidden="true"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     clipRule="evenodd"
//                     fillRule="evenodd"
//                     d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//                   ></path>
//                 </svg>
//               </button>

//               <a href="#" className="flex ms-2 md:me-24">
//                 <img
//                   src="/src/assets/DigiTaratasy_black.svg"
//                   className={`h-8 me-1 duration-500 ${!isSidebarOpen && "rotate-[360deg]"}`}
//                   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 />
//                 <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
//                   Digi<span className="text-blue-400">Taratasy</span>
//                 </span>
//               </a>
//             </div>

//             <div className="flex items-center">
//               <div className="relative flex items-center ms-3">
//                 <button
//                   type="button"
//                   className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//                   onClick={toggleUserMenu}
//                   aria-expanded={isUserMenuOpen}
//                 >
//                   <span className="sr-only">Open user menu</span>

//                   <img
//                     className="w-8 h-8 rounded-full"
//                     src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
//                     alt="user photo"
//                   />
//                 </button>
//                 {isUserMenuOpen && (
//                   <div className="absolute right-0 top-10 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600">
//                     <div className="px-4 py-3">
//                       <p className="text-sm text-gray-900 dark:text-white">
//                         Neil Sims
//                       </p>
//                       <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
//                         neil.sims@flowbite.com
//                       </p>
//                     </div>
//                     <ul className="py-1">
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           Tableau de bord
//                         </a>
//                       </li>
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           Paramètres
//                         </a>
//                       </li>

//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           Se deconnecter
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 h-screen pt-20 transition-all duration-300 ease-in-out bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
//           isSidebarOpen ? 'w-64' : 'w-16'
//         } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
//       >
//         <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
//           {/* Top Navigation Section */}
//           <div>
//             <ul className="space-y-2 font-medium">
//               <li>
//                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                   <span className="material-icons">dashboard</span>
//                   <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Dashboard</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                   <span className="material-icons">notifications</span>
//                   <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Notifications</span>
//                 </a>
//               </li>
//             </ul>

//             {/* Separator */}
//             <div className="my-4 border-t border-gray-200 dark:border-gray-700"></div>

//             {/* Documents Section */}
//             <ul className="space-y-2 font-medium">
//               <li className={`text-gray-500 dark:text-gray-400 text-sm px-2 py-1 ${!isSidebarOpen && 'hidden'}`}>DOCUMENTS</li>
//               <li>
//                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                   <span className="material-icons">assignment</span>
//                   <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Acte de naissance</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                   <span className="material-icons">badge</span>
//                   <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Carte d'identité</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                   <span className="material-icons">family_restroom</span>
//                   <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Livret de famille</span>
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* User Section - Centered */}
//           <div className="my-4">
//             {/* Separator */}
//             <div className="mb-4 border-t border-gray-200 dark:border-gray-700"></div>

//             <ul className="space-y-2 font-medium">
//               <li className={`text-gray-500 dark:text-gray-400 text-sm px-2 py-1 ${!isSidebarOpen && 'hidden'}`}>UTILISATEUR</li>
//               <li>
//                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                   <span className="material-icons">person</span>
//                   <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Profile</span>
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                   <span className="material-icons">group</span>
//                   <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Users</span>
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Bottom Settings Section */}
//           <div>
//             {/* Separator */}
//             <div className="mb-4 border-t border-gray-200 dark:border-gray-700"></div>

//             <ul className="space-y-2 font-medium">
//               <li>
//                 <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
//                   <span className="material-icons">settings</span>
//                   <span className={`ms-3 whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>Paramètres</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </aside>

//       {/* Bouton pour réduire/afficher la sidebar */}
//       <button
//         onClick={toggleSidebar}
//         className={`fixed z-50 p-2 bg-gray-700 items-center justify-center flex text-white rounded-full shadow-lg transition-transform duration-300 ease-in-out sm:block ${
//           isSidebarOpen ? 'left-60 bottom-10' : 'left-12 bottom-10'
//         }`}
//       >
//         <span className="material-icons">
//           {isSidebarOpen ? 'chevron_left' : 'chevron_right'}
//         </span>
//       </button>

//       {/* Contenu principal */}
//       <div
//         className={`p-4 transition-all duration-300 ease-in-out ${
//           isSidebarOpen ? 'sm:ml-64' : 'sm:ml-16'
//         }`}
//       >
//         <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
//           {/* Statistics Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//             <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
//               <div className="flex items-center">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
//                   <span className="material-icons text-2xl">people</span>
//                 </div>
//                 <div>
//                   <span className="block text-2xl font-bold dark:text-white">2,340</span>
//                   <span className="text-gray-500 dark:text-gray-400">Total Users</span>
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center text-sm">
//                 <span className="text-green-500 flex items-center">
//                   <span className="material-icons text-sm">arrow_upward</span>
//                   12%
//                 </span>
//                 <span className="text-gray-400 ml-2">Since last month</span>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
//               <div className="flex items-center">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
//                   <span className="material-icons text-2xl">description</span>
//                 </div>
//                 <div>
//                   <span className="block text-2xl font-bold dark:text-white">1,259</span>
//                   <span className="text-gray-500 dark:text-gray-400">Documents</span>
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center text-sm">
//                 <span className="text-green-500 flex items-center">
//                   <span className="material-icons text-sm">arrow_upward</span>
//                   8%
//                 </span>
//                 <span className="text-gray-400 ml-2">Since last week</span>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
//               <div className="flex items-center">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
//                   <span className="material-icons text-2xl">pending_actions</span>
//                 </div>
//                 <div>
//                   <span className="block text-2xl font-bold dark:text-white">145</span>
//                   <span className="text-gray-500 dark:text-gray-400">Pending</span>
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center text-sm">
//                 <span className="text-red-500 flex items-center">
//                   <span className="material-icons text-sm">arrow_downward</span>
//                   5%
//                 </span>
//                 <span className="text-gray-400 ml-2">Since yesterday</span>
//               </div>
//             </div>

//             <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
//               <div className="flex items-center">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
//                   <span className="material-icons text-2xl">check_circle</span>
//                 </div>
//                 <div>
//                   <span className="block text-2xl font-bold dark:text-white">89%</span>
//                   <span className="text-gray-500 dark:text-gray-400">Success Rate</span>
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center text-sm">
//                 <span className="text-green-500 flex items-center">
//                   <span className="material-icons text-sm">arrow_upward</span>
//                   2%
//                 </span>
//                 <span className="text-gray-400 ml-2">Since last month</span>
//               </div>
//             </div>
//           </div>

//           {/* Service Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
//               <div className="flex items-center mb-4">
//                 <span className="material-icons text-blue-500 text-3xl mr-2">assignment</span>
//                 <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Acte de naissance</h5>
//               </div>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Demandez votre acte de naissance en ligne. Traitement rapide et sécurisé.</p>
//               <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                 Demander
//                 <span className="material-icons text-sm ml-2">arrow_forward</span>
//               </a>
//             </div>

//             <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
//               <div className="flex items-center mb-4">
//                 <span className="material-icons text-purple-500 text-3xl mr-2">badge</span>
//                 <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Carte d'identité</h5>
//               </div>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Faites votre demande de carte d'identité. Processus simplifié et rapide.</p>
//               <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                 Demander
//                 <span className="material-icons text-sm ml-2">arrow_forward</span>
//               </a>
//             </div>

//             <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
//               <div className="flex items-center mb-4">
//                 <span className="material-icons text-green-500 text-3xl mr-2">family_restroom</span>
//                 <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Livret de famille</h5>
//               </div>
//               <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Obtenez votre livret de famille. Service disponible en ligne.</p>
//               <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                 Demander
//                 <span className="material-icons text-sm ml-2">arrow_forward</span>
//               </a>
//             </div>
//           </div>

//           {/* Recent Activity Section */}
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activités récentes</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
//                 <div className="flex items-center space-x-3">
//                   <span className="material-icons text-blue-500">description</span>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-white">Nouvelle demande d'acte de naissance</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 2 heures</p>
//                   </div>
//                 </div>
//                 <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En attente</span>
//               </div>

//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
//                 <div className="flex items-center space-x-3">
//                   <span className="material-icons text-green-500">check_circle</span>
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-white">Carte d'identité approuvée</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Il y a 5 heures</p>
//                   </div>
//                 </div>
//                 <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Approuvé</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;