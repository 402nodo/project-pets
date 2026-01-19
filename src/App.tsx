import { Routes, Route } from 'react-router-dom';
import { PetsProvider } from './context/PetsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Create from './pages/Create';
import PetPage from './pages/PetPage';
import HowItWorks from './pages/HowItWorks';
import './styles/app.css';

function App() {
  return (
    <PetsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/pet/:id" element={<PetPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </Layout>
    </PetsProvider>
  );
}

export default App;




