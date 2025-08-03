import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import ArtisanListPage from './pages/ArtisanListPage';
import ArtisanDetailPage from './pages/ArtisanDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorie/:categoryName" element={<ArtisanListPage />} />
        <Route path="/artisan/:id" element={<ArtisanDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;