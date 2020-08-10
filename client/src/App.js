import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/userViews/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { AdminRoute, UserRoute } from './components/auth/PrivateRoutes';
import Admins from './components/admin/admins';
import AdminForm from './components/admin/adminForm';
import Users from './components/admin/users';
import AdminCourses from './components/admin/courses';
import CourseForm from './components/admin/CourseForm';
import CourseEditForm from './components/admin/CourseEditForm';
import AdminCategories from './components/admin/categories';
import CategoryForm from './components/admin/CategoryForm';
import CategoryEditForm from './components/admin/CategoryEditForm';
import Categories from './components/userViews/Categories';
import CategoryCourses from './components/userViews/CategoryCourses';
import UserCourses from './components/userViews/UserCourses';
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route exact path="/categories" component={Categories} />
          <Route exact path="/categories/:id" component={CategoryCourses} />
          <UserRoute exact path="/mycourses" component={UserCourses} />
          <AdminRoute exact path="/dashboard" component={Admins} />
          <AdminRoute exact path="/dashboard/admins" component={Admins} />
          <AdminRoute exact path="/dashboard/admins/add" component={AdminForm} />
          <AdminRoute exact path="/dashboard/users" component={Users} />
          <AdminRoute exact path="/dashboard/courses" component={AdminCourses} />
          <AdminRoute exact path="/dashboard/courses/add" component={CourseForm} />
          <AdminRoute exact path="/dashboard/courses/:id/edit" component={CourseEditForm} />
          <AdminRoute exact path="/dashboard/categories" component={AdminCategories} />
          <AdminRoute exact path="/dashboard/categories/add" component={CategoryForm} />
          <AdminRoute exact path="/dashboard/categories/:id/edit" component={CategoryEditForm} />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
