import { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { 
  FaUserShield, 
  FaSearch, 
  FaEdit, 
  FaTrash,
  FaQrcode
} from 'react-icons/fa';
import QRCode from 'react-qr-code';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/clients/');
      const transformedData = data.map(user => ({
        id: user.id,
        nom: user.nom || 'Non renseigné',
        prenom: user.prenom || '',
        adresse: user.adresse,
        cin: user.cin,
        qrcode: JSON.stringify({
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          cin: user.cin
        })
      }));
      setUsers(transformedData);
      setLoading(false);
    } catch (error) {
      Swal.fire('Erreur!', 'Impossible de charger les utilisateurs', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Cette action est irréversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8000/api/clients/${id}/`);
        setUsers(users.filter(user => user.id !== id));
        Swal.fire('Supprimé!', 'Utilisateur supprimé avec succès', 'success');
      }
    } catch (error) {
      Swal.fire('Erreur!', 'Échec de la suppression', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const UserFormModal = ({ user, onClose }) => {
    const [formData, setFormData] = useState(user || {
      nom: '',
      prenom: '',
      email: '',
      is_superuser: false
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (user) {
          await axios.put(`http://localhost:8000/api/clients/${user.id}/`, formData);
          Swal.fire('Succès!', 'Utilisateur mis à jour', 'success');
        } else {
          await axios.post('http://localhost:8000/api/clients/', formData);
          Swal.fire('Succès!', 'Nouvel utilisateur créé', 'success');
        }
        fetchUsers();
        onClose();
      } catch (error) {
        Swal.fire('Erreur!', error.response?.data?.message || 'Erreur', 'error');
      }
    };

    return (
      <div className="fixed inset-0 text-white bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">
            {user ? 'Modifier' : 'Nouvel'} Utilisateur
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nom"
              className="w-full p-2 text-white border rounded"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
            />
            <input
              type="text"
              placeholder="Prénom"
              className="w-full text-white p-2 border rounded"
              value={formData.prenom}
              onChange={(e) => setFormData({...formData, prenom: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_superuser}
                onChange={(e) => setFormData({...formData, is_superuser: e.target.checked})}
              />
              <label>Administrateur</label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.cin.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-64"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-red-100 text-red-700 rounded-lg"
      >
        Erreur de chargement : {error}
      </motion.div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold dark:text-white flex items-center">
          <FaUserShield className="mr-2 text-blue-500" />
          Gestion des Utilisateurs
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full p-3 bg-white text-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400 text-white" />
          </div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <table className="w-full bg-white dark:bg-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-bold p-5 text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-center text-xs font-bold p-5 text-gray-500 dark:text-gray-300 uppercase tracking-wider">Prénom</th>
              <th className="px-6 py-3 text-center text-xs font-bold p-5 text-gray-500 dark:text-gray-300 uppercase tracking-wider">CIN</th>
              <th className="px-6 py-3 text-center text-xs font-bold p-5 text-gray-500 dark:text-gray-300 uppercase tracking-wider">QR Code</th>
              <th className="px-6 py-3 text-center text-xs font-bold p-5 text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 text-white dark:hover:bg-blue-600 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.prenom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.cin}
                </td>
            
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.qrcode && (
                    <button 
                      onClick={() => {
                        setSelectedQrCode(user.qrcode);
                        setShowQrModal(true);
                      }}
                      className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <FaQrcode className="inline-block text-lg" />
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
                    <FaEdit className="inline-block" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    <FaTrash className="inline-block" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 text-center text-gray-500 dark:text-gray-400"
        >
          Aucun utilisateur trouvé
        </motion.div>
      )}

     

      {showModal && (
        <UserFormModal
          user={selectedUser}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showQrModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">QR Code Utilisateur</h2>
            <div className="flex flex-col items-center mb-4">
              <div className="mb-4 border-2 p-2 rounded-lg">
                <QRCode 
                  value={selectedQrCode} 
                  size={256}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
            </div>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;