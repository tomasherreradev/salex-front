import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateUser: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [documento, setDocumento] = useState('');
  const [foto, setFoto] = useState<File | null>(null); // Cambiado a tipo File
  const [categoria, setCategoria] = useState<'usuario' | 'suscriptor' | 'administrador'>('usuario');
  const [suscripcionActiva, setSuscripcionActiva] = useState(false);
  const [confirmada, setConfirmada] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !password || !documento || !categoria) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Crear FormData para enviar tanto el archivo como los demás campos
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('telefono', telefono);
    formData.append('documento', documento);
    if (foto) {
      formData.append('profileImage', foto); // Solo añadir la foto si está presente
    }
    formData.append('categoria', categoria);
    formData.append('suscripcion_activa', String(suscripcionActiva));
    formData.append('confirmada', String(confirmada));
    formData.append('admin', 'true');

    try {
      const response = await fetch(`${import.meta.env.VITE_SALEX_BACK_API_URL}/users/create-new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Si es necesario el token
        },
        body: formData, // Usamos FormData en el body
      });

      if (response.ok) {
        toast.success('Usuario creado exitosamente');
        navigate('/admin/users'); // Redirige a la lista de usuarios
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      toast.error('Error inesperado al crear el usuario');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Crear <span className="text-[#0056B3]">Usuario</span></h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Nombre <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Contraseña <span className="text-red-500">*</span></label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Teléfono</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2">Documento <span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Foto (opcional)</label>
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={(e) => setFoto(e.target.files ? e.target.files[0] : null)} // Guardamos el archivo de la foto
          />
        </div>
        <div>
          <label className="block mb-2">Categoría <span className="text-red-500">*</span></label>
          <select
            className="w-full p-2 border rounded"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as 'usuario' | 'suscriptor' | 'administrador')}
            required
          >
            <option value="usuario">Usuario</option>
            <option value="suscriptor">Suscriptor</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">¿Suscripción Activa?</label>
          <input
            type="checkbox"
            checked={suscripcionActiva}
            onChange={(e) => setSuscripcionActiva(e.target.checked)}
          />
        </div>
        <div>
          <label className="block mb-2">¿Cuenta Confirmada?</label>
          <input
            type="checkbox"
            checked={confirmada}
            onChange={(e) => setConfirmada(e.target.checked)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
