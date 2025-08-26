import { Routes, Route } from 'react-router-dom';

import Homepage from './routes/home-page/home-page.route';
import AdminPage from './routes/admin-page/admin-page.route';
import Base64Tool from './routes/base-64-tool/base-64-tool.route';

import './App.css';
import BroadbandMonitor from './routes/broadband-monitor/broadband-monitor.route';

function App() {



  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path='admin/' element={<AdminPage />} />
      <Route path='base64/' element={<Base64Tool />} />
      <Route path='broadband/' element={<BroadbandMonitor />} />
    </Routes>
  )
}

export default App
