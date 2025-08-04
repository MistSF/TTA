import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArtisanListPage from './pages/ArtisanListPage';
import ArtisanDetailPage from './pages/ArtisanDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="container flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categorie/:categoryName" element={<ArtisanListPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/artisan/:id" element={<ArtisanDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
