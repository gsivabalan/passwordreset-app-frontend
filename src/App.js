// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ForgotPasswordPage from './ForgotPasswordPage';
// import NotFoundPage from './NotFoundPage';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/reset-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleTokenSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/verify-token/${token}`);
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/reset-password/${token}`, { newPassword });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      {/* Step 1: Forgot Password */}
      {!token && (
        <form onSubmit={handleEmailSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Step 2: Verify Token */}
      {token && !newPassword && (
        <form onSubmit={handleTokenSubmit}>
          <label>
            Token:
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Step 3: Reset Password */}
      {token && newPassword && (
        <form onSubmit={handlePasswordSubmit}>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default App;




