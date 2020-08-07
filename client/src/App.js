import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/userViews/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserContext from './context/UserContext';

function App() {

  const [userData, setUserData] = useState({})
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const user = JSON.parse(window.atob(token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
      setUserData(user);
    }
  }, [])
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
