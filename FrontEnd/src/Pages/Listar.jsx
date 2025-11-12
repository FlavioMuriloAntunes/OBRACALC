import React, { useEffect, useState } from "react";


const Listar = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/Orcamento")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  return (
    <div className="listar-page">
      <h2> Clientes Cadastrados</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor (R$)</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.clientenome}</td> 
              <td>{cliente.valor.toFixed(2)}</td>
              <td>{cliente.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listar;
