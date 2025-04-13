import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginUser } from './authUser';
import  {jwtDecode}  from "jwt-decode";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const {access, refresh} = response.data;
      
      const decodedToken = jwtDecode(access);
      console.log(decodedToken);

      const isAdmin = decodedToken.is_superuser;
      console.log("isAdmin:", isAdmin);

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');  
      Swal.fire({
          title: 'Connexion réussie!!',
          icon:'success',
          toast:'true',
          timer:'6000',
          position:'top-right',
          timerProgressBase:true,
          showConfirmButton:false,
        })

      if (isAdmin) {
          navigate('/admin'); 
      }else{
          navigate('/');
          window.location.reload();
      }
    } catch (error) {
      console.error('Erreur de connexion :', error.response.data);
      Swal.fire({
          title: 'Indentifiants incorrectes!!',
          icon:'error',
          toast:'true',
          timer:'6000',
          position:'top-right',
          timerProgressBase:true,
          showConfirmButton:false,
        })
    }
  };

  return (
    <div className=" bg min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Connexion
          </h2>
        </div>
        <form className="mt-8 space-y-2" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-5">
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Adresse email
              </label>
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className=" rounded-lg relative block  w-full border px-3 border-gray-300 placeholder-gray-500 text-gray-900 font-bold focus:outline-none"
                placeholder="Adresse email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="appearance-none rounded-lg relative block w-full px-3 border border-gray-300 placeholder-gray-500 text-gray-900 font-bold focus:outline-none"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-4 right-3 text-gray-800"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex  items-center justify-between">
            <div className="flex items-center">
             
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className=" text-[#3498DB] font-bold">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <div className="justify-center">
            <input type="submit" value="Se connecter" className="submit w-full text-white bg-[#3498DB] border mt-8" />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;