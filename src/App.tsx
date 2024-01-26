import { Routes, Route } from 'react-router-dom';

import Homepage from './routes/home-page/home-page.route';
import AdminPage from './routes/admin-page/admin-page.route';
import Base64Tool from './routes/base-64-tool/base-64-tool.route';

import './App.css';

function App() {



  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path='admin/' element={<AdminPage />} />
      <Route path='base64/' element={<Base64Tool />} />
    </Routes>
  )
}

export default App
