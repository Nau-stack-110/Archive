import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Demande enregistrée avec succès !
        </h2>
        <p className="text-gray-600">
          Vous serez redirigé vers l'accueil dans 5 secondes...
        </p>
      </div>
    </div>
  );
};

export default Confirmation; 