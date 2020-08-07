import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/userViews/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminRoute from './components/auth/authRoutes';
import Admins from './components/admin/admins';
import AdminForm from './components/admin/adminForm';
import Users from './components/admin/users';
import Courses from './components/admin/courses';
import Categories from './components/admin/categories';
import UserContext from './context/UserContext';

function App() {


  const token = localStorage.getItem('auth-token');
  let user = null
  if (token) {
    user = JSON.parse(window.atob(token.split('.')[1].replace(/_/g, '/').replace(/-/g, '+')));
  }
  const [userData, setUserData] = useState(user)

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <AdminRoute exact path="/dashboard" component={Admins} />
          <AdminRoute exact path="/dashboard/admins" component={Admins} />
          <AdminRoute exact path="/dashboard/admins/add" component={AdminForm} />
          <AdminRoute exact path="/dashboard/users" component={Users} />
          <AdminRoute exact path="/dashboard/courses" component={Courses} />
          <AdminRoute exact path="/dashboard/categories" component={Categories} />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
