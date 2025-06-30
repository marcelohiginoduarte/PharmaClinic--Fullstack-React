import React, { useState } from 'react';
import './Entradas.css';

function Entradas() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [estoque, setEstoque] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !quantidade) {
      alert('Preencha todos os campos');
      return;
    }

    const novoItem = {
      nome,
      quantidade: parseInt(quantidade)
    };

    setEstoque([...estoque, novoItem]);
    setNome('');
    setQuantidade('');
  };

  return (
    <div className="entrada-container">
      <h1 className="h1t">Cadastrar Novo Medicamento</h1>

      <form className="entrada-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do medicamento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {estoque.length > 0 && (
        <div className="lista-estoque">
          <h2>Itens cadastrados:</h2>
          <ul>
            {estoque.map((item, index) => (
              <li key={index}>
                {item.nome} - {item.quantidade} unidades
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Entradas;