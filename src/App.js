import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorPage from './pages/ErrorPage';
import AdminRoutes from './middlewares/AdminRoutes';
import AdminPage from './pages/admin/AdminPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path='*' element={<ErrorPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
