import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaFileContract, 
  FaMapMarkerAlt,
  FaCity,
  FaUserTie
} from 'react-icons/fa';

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/stats');
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Charger les stats immédiatement
    fetchStats();

    // Mettre en place l'intervalle de rafraîchissement
    const interval = setInterval(fetchStats, 1000);

    // Nettoyage
    return () => clearInterval(interval);
  }, []);

  const statsConfig = [
    { 
      title: "Utilisateurs", 
      value: stats?.users,
      icon: <FaUsers className="text-3xl flex items-center text-blue-500"/>,
      color: 'blue'
    },
    { 
      title: "Communes", 
      value: stats?.communes,
      icon: <FaCity className="text-3xl text-purple-500"/>,
      color: 'purple'
    },
    { 
      title: "Régions", 
      value: stats?.regions,
      icon: <FaMapMarkerAlt className="text-3xl flex items-center text-green-500"/>,
      color: 'green'
    },
    { 
      title: "Admin", 
      value: stats?.administrateurs,
      icon: <FaUserTie className="text-3xl flex items-center text-yellow-500"/>,
      color: 'yellow'
    },
    { 
      title: "Demandes d'actes", 
      value: stats?.demandes_acte,
      icon: <FaFileContract className="text-3xl text-red-500"/>,
      color: 'red',
      onClick: () => navigate('/admin/notifications')
    },
    { 
      title: "Clients", 
      value: stats?.clients,
      icon: <FaUsers className="text-3xl text-indigo-500"/>,
      color: 'indigo',
      onClick: () => navigate('/admin/utilisateurs')
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Erreur de chargement des statistiques : {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Grille de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {statsConfig.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 ${
              stat.onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''
            }`}
            onClick={stat.onClick}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-800/30`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graphiques supplémentaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition des types d'actes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-xl font-bold dark:text-white mb-4">Types d'actes</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats?.types_acte && Object.entries(stats.types_acte).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">{type}</span>
                <span className="font-bold dark:text-white">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Répartition géographique */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-xl font-bold dark:text-white mb-4">Clients par commune</h3>
          <div className="space-y-3">
            {stats?.clients_par_commune?.map((commune, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-gray-700 dark:text-gray-300">{commune.commune}</span>
                <span className="font-bold dark:text-white">{commune.count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome; 