import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/accueil";
import Error from "./components/404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
