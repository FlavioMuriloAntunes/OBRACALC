import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import "../styles/global.css";

const Dashboard = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const response = await fetch("http://localhost:8080/Orcamento");
        const data = await response.json();
        setOrcamentos(data);
      } catch (error) {
        console.error("Erro ao buscar orçamentos:", error);
      }
    };

    fetchOrcamentos();
  }, []);

  const handleClick = (id) => {
    navigate(`/atualizar/${id}`);
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-menu">
        <Menu />
      </aside>

      <main className="listar-page">
        <h2>📊 Orçamentos</h2>
        <p>Clique em um orçamento para atualizá-lo.</p>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Valor (R$)</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos.map((orc) => (
              <tr
                key={orc.id}
                onClick={() => handleClick(orc.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{orc.id}</td>
                <td>{orc.clientenome || "—"}</td>
                <td>{orc.valor ? orc.valor.toFixed(2) : "0.00"}</td>
                <td>{orc.descricao || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Dashboard;
