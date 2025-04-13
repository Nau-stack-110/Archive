import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { FaUserCircle, FaKey, FaSave, FaSpinner } from 'react-icons/fa'
import Swal from 'sweetalert2'
import 'animate.css/animate.min.css'

export default function Profile() {
  const [userData, setUserData] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        
        const { data } = await axios.get(`http://localhost:8000/api/users/${userId}`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('access_token')}` 
          }
        });
        setUserData(data)
      } catch (error) {
        Swal.fire('Erreur!', 'Impossible de charger le profil', 'error')
      }
    }
    fetchProfile()
  }, [])

  const onSubmitPassword = async (formData) => {
    setIsUpdating(true)
    try {
      await axios.put('http://localhost:8000/api/change-password', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      Swal.fire('Succès!', 'Mot de passe mis à jour avec succès', 'success')
    } catch (error) {
      Swal.fire('Erreur!', error.response?.data?.message || 'Échec de la mise à jour', 'error')
    }
    setIsUpdating(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate__animated animate__fadeIn">
      {/* Section Informations utilisateur */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
          <FaUserCircle className="animate__animated animate__fadeInLeft" />
          {userData ? `Profil Administrateur - ${userData.username}` : "Profil Administrateur"}
        </h2>

        {userData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <InfoItem label="Nom d'utilisateur" value={userData.username} />
              <InfoItem label="Email" value={userData.email} />
              <InfoItem
                label="Administrateur de commune"
                value={userData.is_admin_commune ? "Oui" : "Non"}
              />
            </div>
            <div className="space-y-3">
              <InfoItem label="Client" value={userData.is_client ? "Oui" : "Non"} />
              <InfoItem label="Reset PIN" value={userData.reset_pin || "Non défini"} />
              <InfoItem label="Tentatives PIN" value={userData.pin_attempts} />
              <InfoItem
                label="Expiration du PIN"
                value={
                  userData.pin_expires_at
                    ? new Date(userData.pin_expires_at).toLocaleString()
                    : "Non défini"
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Section Changement de mot de passe */}
      <form
        onSubmit={handleSubmit(onSubmitPassword)}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
          <FaKey className="animate__animated animate__fadeInLeft" />
          Changer le mot de passe
        </h2>

        <div className="space-y-4">
          <InputField
            icon="currentPassword"
            label="Mot de passe actuel"
            type="password"
            register={register}
            errors={errors}
            required
          />

          <InputField
            icon="newPassword"
            label="Nouveau mot de passe"
            type="password"
            register={register}
            errors={errors}
            required
            validate={value => value.length >= 8 || "Minimum 8 caractères"}
          />

          <InputField
            icon="confirmPassword"
            label="Confirmer le mot de passe"
            type="password"
            register={register}
            errors={errors}
            required
            validate={value => value === watch('newPassword') || "Les mots de passe ne correspondent pas"}
          />

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isUpdating ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSave className="animate__animated animate__pulse" />
            )}
            {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </div>
      </form>
    </div>
  )
}

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col space-y-1 border-b pb-2 border-gray-100 dark:border-gray-700">
    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{value || 'Non défini'}</span>
  </div>
)

const InputField = ({ icon, label, type, register, errors, required, validate }) => (
  <div className="relative group">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      {...register(icon.toLowerCase(), { required: required && "Ce champ est requis", validate })}
      className={`w-full px-4 py-3 rounded-lg border ${
        errors[icon.toLowerCase()] 
          ? 'border-red-500 focus:ring-red-500' 
          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
      } transition-all duration-300 bg-white dark:bg-gray-700`}
    />
    {errors[icon.toLowerCase()] && (
      <span className="text-red-500 text-sm mt-1 block animate__animated animate__headShake">
        {errors[icon.toLowerCase()].message}
      </span>
    )}
  </div>
)
