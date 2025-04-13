import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DocumentForm = ({ serviceType }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    lieu_naissance: '',
    date_naissance: '',
    adresse: '',
    image: null,
    sexe: '',
    cin: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientId = localStorage.getItem('id_client');
      
      // Convertir le type d'acte en minuscules
      const typeActeNormalise = serviceType.toLowerCase();

      const { data } = await axios.post('http://localhost:8000/api/demandes-acte/', {
        type_acte: typeActeNormalise,
        client: clientId,
        statut: 'en attente'
      });

      await Swal.fire({
        icon: 'success',
        title: 'Demande enregistrée !',
        text: `Votre demande d'${data.get_type_acte_display.toLowerCase()} a été créée`,
        showConfirmButton: false,
        timer: 3000
      });
      
      navigate('/confirmation');
    } catch (error) {
      let errorMessage = 'Erreur lors de la création';
      if (error.response?.data) {
        errorMessage = Object.values(error.response.data).join('\n');
      }
      
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: errorMessage,
        confirmButtonColor: '#2563eb',
      });
    }
  };

  const handleClose = () => navigate('/');

  const renderAdditionalFields = () => {
    switch(serviceType) {
      case 'Acte de mariage':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom du conjoint"
                className="p-2 border rounded"
                onChange={(e) => setFormData({...formData, conjoints: [...formData.conjoints, e.target.value]})}
              />
              <input
                type="text"
                placeholder="Prénom du conjoint"
                className="p-2 border rounded"
              />
            </div>
            <input
              type="number"
              placeholder="Nombre d'enfants"
              className="p-2 border rounded"
              onChange={(e) => setFormData({...formData, enfants: Array(Number(e.target.value)).fill('')})}
            />
          </>
        );
      case 'Acte de décès':
        return (
          <textarea
            placeholder="Cause du décès"
            className="p-2 border rounded"
            onChange={(e) => setFormData({...formData, cause_deces: e.target.value})}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <button
          onClick={handleClose}
          className="mb-4 text-blue-600 hover:text-blue-800 dark:text-blue-400"
        >
          &larr; Retour
        </button>
        
        <h2 className="text-2xl font-bold dark:text-white mb-6">Demande d&apos;acte de {decodeURIComponent(serviceType)}</h2>
        
        <motion.form
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 text-white w-full md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom"
              className="p-2 border rounded bg-white w-full text-black   dark:text-white"
              required
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
            />
            <input
              type="text"
              placeholder="Prénom"
              className="p-2 border rounded bg-white w-full text-black   dark:text-white"
              required
              onChange={(e) => setFormData({...formData, prenom: e.target.value})}
            />
            <input
              type="text"
              placeholder="Lieu de naissance"
              className="p-2 border rounded bg-white w-full text-black   dark:text-white"
              required
              onChange={(e) => setFormData({...formData, lieu_naissance: e.target.value})}
            />
            <input
              type="date"
              className="p-2 border rounded bg-white w-full text-black   dark:text-white"
              required
              onChange={(e) => setFormData({...formData, date_naissance: e.target.value})}
            />
            <input
              type="file"
              className="p-2 border rounded bg-white w-full text-black  "
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
            />
            <input
              type="text"
              placeholder="Adresse"
              className="p-2 border rounded bg-white w-full text-black   dark:text-white"
              required
              onChange={(e) => setFormData({...formData, adresse: e.target.value})}
            />
            <input
              type="text"
              placeholder="CIN"
              className="p-2 border rounded bg-white w-full text-black   dark:text-white"
              required
              onChange={(e) => setFormData({...formData, cin: e.target.value})}
            />
            <select
              className="p-2 border rounded bg-white w-full text-black   dark:text-white"
              required
              onChange={(e) => setFormData({...formData, sexe: e.target.value})}
            >
              <option value="">Sélectionnez le sexe</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
          </div>

          {renderAdditionalFields()}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Soumettre
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default DocumentForm; 