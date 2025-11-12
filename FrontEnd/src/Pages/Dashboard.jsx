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

  // 🔄 Ao clicar no orçamento, redireciona para o formulário de cadastro de ambiente
  const handleClick = (id) => {
    navigate(`/cadastrarAmbiente/${id}`);
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-menu">
        <Menu />
      </aside>

      <main className="listar-page">
        <h2>📊 Orçamentos</h2>
        <p>Clique em um orçamento para cadastrar os ambientes.</p>

        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Valor (R$)</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos.length > 0 ? (
              orcamentos.map((orc) => (
                <tr
                  key={orc.id}
                  onClick={() => handleClick(orc.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{orc.clientenome || "—"}</td>
                  <td>
                    {orc.valor
                      ? `R$ ${parseFloat(orc.valor).toFixed(2)}`
                      : "R$ 0,00"}
                  </td>
                  <td>
                    {orc.data
                      ? new Date(orc.data).toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                  <td>
                    <span
                      style={{
                        color:
                          orc.status === "Aprovado"
                            ? "green"
                            : orc.status === "Recusado"
                            ? "red"
                            : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {orc.status || "—"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                  Nenhum orçamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Dashboard;
