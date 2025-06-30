import React, { useState } from 'react';
import './saidas.css';

function Saidas() {
  const [remedio, setRemedio] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [nomePessoa, setNomePessoa] = useState('');
  const [nomeEntregador, setNomeEntregador] = useState('');
  const [sus, setSus] = useState('');
  const [cpf, setCpf] = useState('');
  const [saidas, setSaidas] = useState([]);
  const [comReceita, setComReceita] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!remedio || !quantidade || !nomePessoa || !sus || !cpf) {
      alert('Preencha todos os campos');
      return;
    }

    const novaSaida = {
      remedio,
      quantidade: parseInt(quantidade),
      nomePessoa,
      sus,
      cpf
    };

    setSaidas([...saidas, novaSaida]);

    setRemedio('');
    setQuantidade('');
    setNomePessoa('');
    setSus('');
    setCpf('');
  };

  return (
    <div className="saida-container">
      <h1 className="h1t">Registrar Saída de Medicamento</h1>

      <form className="saida-form" onSubmit={handleSubmit}>
        <label>Nome do remédio</label>
        <input
          type="text"
          placeholder="Ex: Dipirona"
          value={remedio}
          onChange={(e) => setRemedio(e.target.value)}
        />

        <label>Quantidade</label>
        <input
          type="number"
          placeholder="Ex: 2"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />

        <label>Nome do responsavel pela entrega:</label>
        <input
          type="text"
          placeholder="Nome do responsavel pela entrega"
          value={nomeEntregador}
          onChange={(e) => setNomeEntregador(e.target.value)}
          />

        <label>Nome da pessoa que está recebendo</label>
        <input
          type="text"
          placeholder="Ex: João da Silva"
          value={nomePessoa}
          onChange={(e) => setNomePessoa(e.target.value)}
        />

        <label>Número do SUS</label>
        <input
          type="text"
          placeholder="Ex: 123 4567 8901 2345"
          value={sus}
          onChange={(e) => setSus(e.target.value)}
        />

        <label>Número do CPF</label>
        <input
          type="text"
          placeholder="Ex: 123.456.789-00"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <label>
        <input
          type="checkbox"
          checked={comReceita}
          onChange={(e) => setComReceita(e.target.checked)}
        />
        Com Receita
      </label>
        <button type="submit">Registrar Saída</button>
      </form>


      {saidas.length > 0 && (
        <div className="lista-saidas">
          <h2>Saídas registradas:</h2>
          <ul>
            {saidas.map((s, index) => (
              <li key={index}>
                <strong>{s.remedio}</strong> - {s.quantidade} unidades | {s.nomePessoa} | SUS: {s.sus} | CPF: {s.cpf}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Saidas;
