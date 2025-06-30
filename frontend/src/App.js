import './App.css';
import Sidebar from './components/menu/Sidebar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro/cadastro';
import Estoque from './pages/estoque/Estoque';
import Saidas from './pages/saidas/saidas';
import Entradas from './pages/entradas/Entradas';


function App() {
  return (
    <Router>
      <div className="App-layout">
        <Sidebar />
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Cadastro />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/saida" element={<Saidas />} />
            <Route path="/entradas" element={<Entradas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
