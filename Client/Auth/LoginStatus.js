import React from 'react';
import { useAuth } from '../Auth/AuthContext';

const LoginStatus = () => {
  const { user, avatarUrl, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or any loading indicator you prefer
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user.user_metadata?.first_name}!</p>
      {/* Add other user-related information or actions here */}
    </div>
  );
};

export default LoginStatus;
