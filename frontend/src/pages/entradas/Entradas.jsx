import React, { useState } from 'react';
import './Entradas.css';

function Entradas() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [estoque, setEstoque] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !quantidade) {
      alert('Preencha todos os campos');
      return;
    }

    const novoItem = {
      name_medicine: nome,
      amount_medicine: parseInt(quantidade)
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/pharmas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoItem)
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar medicamento');
      }

      const data = await response.json();

      setEstoque([...estoque, {
        nome: data.name_medicine,
        quantidade: data.amount_medicine
      }]);

      setNome('');
      setQuantidade('');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar os dados. Verifique o console.');
    }
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
