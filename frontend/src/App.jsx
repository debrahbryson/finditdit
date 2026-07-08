import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import PostItem from './pages/PostItem';
import MyClaims from './pages/MyClaims';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/items/:id" element={<PrivateRoute><ItemDetail /></PrivateRoute>} />
        <Route path="/post-item" element={<PrivateRoute><PostItem /></PrivateRoute>} />
        <Route path="/my-claims" element={<PrivateRoute><MyClaims /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;