import React, { useState } from "react";
import "../styles/global.css";
import "../components/Menu.css";

const Cadastrar = () => {
  const [clienteNome, setClienteNome] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoOrcamento = {
      clientenome: clienteNome, // igual ao nome do campo no backend
      valor: parseFloat(valor),
      descricao: descricao,
    };

    try {
      const response = await fetch("http://localhost:8080/Orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoOrcamento),
      });

      if (response.ok) {
        setMensagem("Orçamento cadastrado com sucesso!");
        setClienteNome("");
        setValor("");
        setDescricao("");
      } else {
        setMensagem("Erro ao cadastrar orçamento.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("⚠️ Erro de conexão com a API.");
    }
  };

  return (
    <div className="page">
      <h2>📝 Cadastrar Orçamento</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome do Cliente:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          value={clienteNome}
          onChange={(e) => setClienteNome(e.target.value)}
          required
        />

        <label>Valor (R$):</label>
        <input
          type="number"
          placeholder="Digite o valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />

        <label>Descrição:</label>
        <textarea
          placeholder="Digite os detalhes do orçamento"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        ></textarea>

        <button type="submit">Salvar</button>
      </form>

      {mensagem && <p style={{ marginTop: "10px" }}>{mensagem}</p>}
    </div>
  );
};

export default Cadastrar;
