import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Notifie = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/demandes-acte/');
      const formattedNotifications = response.data.map(demande => ({
        id: demande.id,
        title: 'Nouvelle demande d\'acte',
        message: `Demande d'acte de ${demande.type_acte || 'non spécifié'} par ${demande.client_id || 'Anonyme'}`,
        time: new Date(demande.date_demande).toLocaleDateString(),
        type: 'request',
        viewed: demande.viewed || false
      }));
      setNotifications(formattedNotifications);
      setLoading(false);

      // Marquer les notifications comme vues
      const notificationIds = response.data.map(demande => demande.id);
      if (notificationIds.length > 0) {
        try {
          await axios.post('http://localhost:8000/api/demandes-acte/mark-viewed/', {
            ids: notificationIds
          });
          window.dispatchEvent(new CustomEvent('notificationsViewed'));
        } catch (error) {
          console.error('Erreur lors du marquage des notifications:', error);
        }
      }
    } catch (err) {
      setError('Erreur lors du chargement des notifications');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Cette action est irréversible !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8000/api/demandes-acte/${id}/`);
        setNotifications(notifications.filter(notif => notif.id !== id));
        Swal.fire(
          'Supprimé !',
          'La demande a été supprimée avec succès.',
          'success'
          
        );
      }
    } catch (error) {
      Swal.fire(
        'Erreur !',
        'Une erreur est survenue lors de la suppression.',
        'error'
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold dark:text-white mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <div className="p-4 text-gray-600 dark:text-gray-300">Aucune notification disponible</div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform duration-200 hover:scale-[1.02] ${
              !notification.viewed ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="material-icons mr-2 text-blue-500">
                  {notification.type === 'request' ? 'description' : 
                   notification.type === 'success' ? 'check_circle' : 'info'}
                </span>
                <h3 className="text-lg font-semibold dark:text-white">{notification.title}</h3>
              </div>
              <button
                onClick={() => handleDelete(notification.id)}
                className=" top-5 right-5 text-red-600 hover:text-red-20  rounded-full transition-colors duration-200"
              >
                <span className="material-icons ">delete</span>
              </button>
            </div>
            <p className="text-gray-600  dark:text-gray-300 mb-2">{notification.message}</p>
            <span className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifie;