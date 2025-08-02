import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import ArtisanListPage from './pages/ArtisanListPage';

function App() {
  return (
    <div className="App">
      {/* Le Header et le Footer seront ici, en dehors des Routes, 
          pour être présents sur toutes les pages */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artisans" element={<ArtisanListPage />} />
        {/* Ajoutez les autres routes ici (fiche artisan, etc.) */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>

    </div>
  );
}

export default App;