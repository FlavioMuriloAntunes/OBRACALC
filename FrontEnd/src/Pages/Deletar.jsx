import React, { useEffect, useState } from "react";


const ListarOrcamentos = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  // Buscar todos os orçamentos ao carregar a página
  useEffect(() => {
    buscarOrcamentos();
  }, []);

  const buscarOrcamentos = async () => {
    try {
      const response = await fetch("http://localhost:8080/Orcamento");
      if (response.ok) {
        const data = await response.json();
        setOrcamentos(data);
      } else {
        setMensagem("Erro ao buscar orçamentos.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro de conexão com a API.");
    }
  };

  // 🔹 Deletar um orçamento específico
  const deletarOrcamento = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este orçamento?")) return;

    try {
      const response = await fetch(`http://localhost:8080/Orcamento/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMensagem(" Orçamento deletado com sucesso!");
        // Atualiza a lista automaticamente
        setOrcamentos(orcamentos.filter((orc) => orc.id !== id));
      } else {
        setMensagem(" Erro ao deletar o orçamento.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem(" Erro de conexão com a API.");
    }
  };

  return (
    <div className="page">
      <h2> Lista de Orçamentos</h2>

      {mensagem && <p style={{ marginBottom: "10px" }}>{mensagem}</p>}

      {orcamentos.length === 0 ? (
        <p>Nenhum orçamento encontrado.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f3f3" }}>
              <th>ID</th>
              <th>Cliente</th>
              <th>Valor (R$)</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos.map((orc) => (
              <tr key={orc.id}>
                <td>{orc.id}</td>
                <td>{orc.clientenome}</td>
                <td>{orc.valor}</td>
                <td>{orc.descricao}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => deletarOrcamento(orc.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarOrcamentos;
