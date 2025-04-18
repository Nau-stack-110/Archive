import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DocumentForm = ({ serviceType }) => {
  const navigate = useNavigate();

 
  const [Demande,setDemande] = useState([]);
  const [Nom, setNom] =  useState("")
  const [Prenom, setPrenom] =  useState("")
  const [Lieu_nai, setLieu_nai] =  useState("")
  const [Date_nai, setDate_nai] =  useState("")
  const [Email, setEmail] =  useState("")
  const [Adresse, setAdresse] =  useState("")
  const [Cin, setCin] =  useState("")
  const [Sexe, setSexe] =  useState("")

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const clientId = localStorage.getItem('id_client');
      
  //     // Convertir le type d'acte en minuscules
  //     const typeActeNormalise = serviceType.toLowerCase();

  //     const { data } = await axios.post('http://localhost:8000/api/demandes-acte/', {
  //       type_acte: typeActeNormalise,
  //       client: clientId,
  //       statut: 'en attente',
  //       ...formData
  //     });

  //     setSuccess('Document ajouté avec succès !');
  //     setTimeout(() => {
  //       navigate('/home');
  //     }, 2000);

  //     await Swal.fire({
  //       icon: 'success',
  //       title: 'Demande enregistrée !',
  //       text: `Votre demande d'${data.get_type_acte_display.toLowerCase()} a été créée`,
  //       showConfirmButton: false,
  //       timer: 3000
  //     });
      
  //   } catch (error) {
  //     let errorMessage = 'Veuiller verifier votre Email';
      
      
  //     await Swal.fire({
  //       icon: 'success',
  //       title: 'Success',
  //       text: errorMessage,
  //       confirmButtonColor: '#2563eb',
        
    
  //     });
  //     setTimeout(() => {
  //       navigate('/');
  //     }, 1000);
  //   }
  // };

  // edit by garrix
  const DemandeActe = async () =>{
    const formulaire = {
      Nom,
      Prenom,
      Lieu_nai,
      Date_nai,
      Email,
      Adresse,
      Cin,
      Sexe

    };
    try {
      const response = await fetch("http://localhost:8000/api/clients/",{
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(formulaire),

      });

      const data = await response.json()
      setDemande((prev) => [...prev,data]);

    } catch (err){
      console.log(err);
    }
  
  };


  // end edit

  const handleClose = () => navigate('/');

  // const renderAdditionalFields = () => {
  //   switch(serviceType) {
  //     case 'Acte de mariage':
  //       return (
  //         <>
  //           <div className="grid grid-cols-2 gap-4">
  //             <input
  //               type="text"
  //               placeholder="Nom du conjoint"
  //               className="p-2 border rounded bg-white w-full text-black"
  //               onChange={(e) => setFormData({...formData, conjoints: [...formData.conjoints, e.target.value]})}
  //             />
  //             <input
  //               type="text"
  //               placeholder="Prénom du conjoint"
  //               className="p-2 border rounded bg-white w-full text-black"
  //             />
  //           </div>
  //           <input
  //             type="number"
  //             placeholder="Nombre d'enfants"
  //             className="p-2 border rounded bg-white w-full text-black"
  //             onChange={(e) => setFormData({...formData, enfants: Array(Number(e.target.value)).fill('')})}
  //           />
  //         </>
  //       );
  //     case 'Acte de décès':
  //       return (
  //         <textarea
  //           placeholder="Cause du décès"
  //           className="p-2 border rounded bg-white w-full text-black"
  //           onChange={(e) => setFormData({...formData, cause_deces: e.target.value})}
  //         />
  //       );
  //     default:
  //       return null;
  //   }
  // };

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
          // onSubmit={handleSubmit}
          onSubmit={DemandeActe}
        >
          <div className="grid grid-cols-1 text-black w-full md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom"
              className="p-2 border rounded bg-white w-full text-black"
              required
              onChange={(e) => setNom(e.target.value)}
            />
            <input
              type="text"
              placeholder="Prénom"
              className="p-2 border rounded bg-white w-full text-black"
              required
              onChange={(e) => setPrenom(e.target.value)}
            />
            <input
              type="text"
              placeholder="Lieu de naissance"
              className="p-2 border rounded bg-white w-full text-black"
              required
              onChange={(e) => setLieu_nai(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border rounded bg-white w-full text-black"
              required
              onChange={(e) => setDate_nai(e.target.value)}
            />
            <input
              type="Email"
              placeholder="Email"
              className="p-2 border rounded bg-white w-full text-black"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
              
            <input
              type="text"
              placeholder="Adresse"
              className="p-2 border rounded bg-white w-full text-black"
              required
              onChange={(e) => setAdresse(e.target.value)}
            />
            <input
              type="number"
              placeholder="CIN"
              className="p-2 border rounded bg-white w-full text-black"
              required
              onChange={(e) => setCin(e.target.value)}
            />
            <select
              className="p-2 border rounded bg-white w-full text-black"
              required
              onChange={(e) => setSexe(e.target.value)}
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