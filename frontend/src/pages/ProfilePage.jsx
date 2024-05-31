import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await axios.get('/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {user.firstName} {user.lastName}</p>
      <p>Nombre de Usuario: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>País: {user.country}</p>
      <p>Teléfono: {user.phone}</p>
      <p>Posiciones: {user.positions.join(', ')}</p>
      <p>Plataformas: {user.platforms.join(', ')}</p>
    </div>
  );
};

export default ProfilePage;