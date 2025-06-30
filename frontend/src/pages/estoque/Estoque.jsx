import React, { useState } from 'react';
import './estoque.css';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Estoque() {
  const remedios = [
    { nome: 'Paracetamol 500mg', quantidade: 50 },
    { nome: 'Ibuprofeno 200mg', quantidade: 30 },
    { nome: 'Amoxicilina 500mg', quantidade: 20 },
    { nome: 'Dipirona 1g', quantidade: 100 },
    { nome: 'Omeprazol 20mg', quantidade: 15 },
    { nome: 'Losartana 50mg', quantidade: 45 },
    { nome: 'Cloroquina 150mg', quantidade: 5 },
    { nome: 'Vitamina C 1g', quantidade: 60 },
    { nome: 'Ranitidina 150mg', quantidade: 25 },
    { nome: 'Simeticona 40mg', quantidade: 70 },
  ];

  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [menuAbertoIndex, setMenuAbertoIndex] = useState(null);
  const itensPorPagina = 10;

  const remediosFiltrados = remedios.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;
  const remediosPaginados = remediosFiltrados.slice(indexInicial, indexFinal);
  const totalPaginas = Math.ceil(remediosFiltrados.length / itensPorPagina);

  const mudarPagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };

  const toggleMenu = (index) => {
    if (menuAbertoIndex === index) {
      setMenuAbertoIndex(null);
    } else {
      setMenuAbertoIndex(index);
    }
  };

  return (
    <div className="estoque-page">
      <h1 className="estoque-titulo"> Estoque de Medicamentos</h1>

      <div className="estoque-topo">
        <div className="estoque-busca">
          <FaSearch className="icone-busca" />
          <input
            type="text"
            placeholder="Buscar medicamento..."
            value={busca}
            onChange={handleBuscaChange}
          />
        </div>

        {totalPaginas > 1 && (
          <div className="paginacao">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => mudarPagina(num)}
                className={num === paginaAtual ? 'pagina-ativa' : ''}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="estoque-tabela-wrapper">
        <table className="estoque-tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {remediosPaginados.length > 0 ? (
              remediosPaginados.map((item, index) => (
                <tr key={index}>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>
                  <td className="opcoes-container">
                    <button
                      className="botao-opcoes"
                      onClick={() => toggleMenu(index)}
                      aria-expanded={menuAbertoIndex === index}
                      aria-haspopup="true"
                    >
                      Opções{' '}
                      {menuAbertoIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    {menuAbertoIndex === index && (
                      <ul className="menu-dropdown">
                        <li>
                          <button className="menu-item" onClick={() => alert(`Editar ${item.nome}`)}>
                            Editar
                          </button>
                        </li>
                      </ul>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum medicamento encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Estoque;



