import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="detail-container" style={{ maxWidth: '600px', margin: '4rem auto' }}>
      <h1 className="form-title" style={{ fontSize: '2rem' }}>Mi Perfil</h1>
      
      <div style={{ marginTop: '2rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          **Nombre:** {user?.name}
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          **Email:** {user?.email}
        </p>
        <p style={{ fontSize: '1.2rem' }}>
          **ID de Usuario:** {user?._id}
        </p>
      </div>
      
      <h2 style={{ marginTop: '3rem', fontSize: '1.5rem' }}>Mis Pedidos</h2>
      <p style={{ color: '#888' }}>
      </p>

    </div>
  );
};

export default ProfilePage;