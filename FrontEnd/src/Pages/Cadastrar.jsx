import React, { useState, useEffect } from "react";
import "../styles/global.css";

const Cadastrar = () => {
  const [clienteNome, setClienteNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [custosExtras, setCustosExtras] = useState("");
  const [descontoAplicado, setDescontoAplicado] = useState("");
  const [valorTotal, setValorTotal] = useState("0.00");

  const [mostrarAmbientes, setMostrarAmbientes] = useState(false);
  const [ambientes, setAmbientes] = useState([{ nome: "", metragem: "", itens: [] }]);
  const [mostrarResumo, setMostrarResumo] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // Cálculo automático do valor total
  useEffect(() => {
    const base = parseFloat(valor) || 0;
    const extras = parseFloat(custosExtras) || 0;
    const desconto = parseFloat(descontoAplicado) || 0;
    const total = base + extras - desconto;
    setValorTotal(total > 0 ? total.toFixed(2) : "0.00");
  }, [valor, custosExtras, descontoAplicado]);

  // Etapa 1 -> Etapa 2
  const handleContinuar = (e) => {
    e.preventDefault();
    if (!clienteNome || !valor || !data || !status) {
      setMensagem("Por favor, preencha os campos obrigatórios da Etapa 1.");
      return;
    }
    setMensagem("");
    setMostrarAmbientes(true);
  };

  // Etapa 2 -> Etapa 3
  const handleContinuarResumo = () => {
    setMostrarResumo(true);
  };

  // Etapa 2 -> Voltar para Etapa 1
  const handleVoltarEtapa1 = () => {
    setMostrarAmbientes(false);
    setMostrarResumo(false);
  };

  // Atualiza nome ou metragem do ambiente
  const handleAmbienteChange = (index, e) => {
    const newAmbientes = [...ambientes];
    newAmbientes[index][e.target.name] = e.target.value;
    setAmbientes(newAmbientes);
  };

  // Adiciona novo ambiente
  const adicionarAmbiente = () => {
    setAmbientes([...ambientes, { nome: "", metragem: "", itens: [] }]);
  };

  // Remove um ambiente pelo índice
  const removerAmbiente = (indexAmb) => {
    const newAmbientes = [...ambientes];
    newAmbientes.splice(indexAmb, 1);
    setAmbientes(newAmbientes);
  };

  // Adiciona item a um ambiente
  const adicionarItem = (indexAmb) => {
    const newAmb = [...ambientes];
    newAmb[indexAmb].itens.push({
      tipo: "",
      nome: "",
      unidade: "",
      valorUnitario: "",
      quantidade: "",
      valorTotal: 0,
      categoria: "",
      valorSugerido: ""
    });
    setAmbientes(newAmb);
  };

  // Remove um item de um ambiente
  const removerItem = (indexAmb, indexItem) => {
    const newAmb = [...ambientes];
    newAmb[indexAmb].itens.splice(indexItem, 1);
    setAmbientes(newAmb);
  };

  // Atualiza campos de item
  const handleItemChange = (indexAmb, indexItem, campo, valor) => {
    const newAmb = [...ambientes];
    const item = newAmb[indexAmb].itens[indexItem];
    item[campo] = valor;

    // Atualiza valor total automaticamente
    const unit = parseFloat(item.valorUnitario || item.valorSugerido || 0);
    const qtd = parseFloat(item.quantidade || 0);
    item.valorTotal = (unit * qtd).toFixed(2);

    setAmbientes(newAmb);
  };

  // Envia tudo para API apenas na última etapa
  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoOrcamento = {
      clientenome: clienteNome,
      descricao,
      valor: parseFloat(valor),
      data,
      status,
      telefone,
      email,
      endereco,
      valorTotal: parseFloat(valorTotal),
      custosExtras: parseFloat(custosExtras) || 0,
      descontoAplicado: parseFloat(descontoAplicado) || 0,
      ambientes: ambientes.filter((amb) => amb.nome.trim() !== ""),
    };

    try {
      const response = await fetch("http://localhost:8080/Orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoOrcamento),
      });

      if (response.ok) {
        setMensagem("✅ Orçamento cadastrado com sucesso!");
        setClienteNome("");
        setDescricao("");
        setValor("");
        setData("");
        setStatus("");
        setTelefone("");
        setEmail("");
        setEndereco("");
        setCustosExtras("");
        setDescontoAplicado("");
        setValorTotal("0.00");
        setAmbientes([{ nome: "", metragem: "", itens: [] }]);
        setMostrarAmbientes(false);
        setMostrarResumo(false);
      } else {
        setMensagem("❌ Erro ao cadastrar orçamento.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("⚠️ Erro de conexão com a API.");
    }
  };

  return (
    <div className="page">
      <h2>📝 Cadastrar Orçamento</h2>

      {mensagem && (
        <p
          style={{
            marginTop: "10px",
            color:
              mensagem.startsWith("❌") || mensagem.startsWith("⚠️")
                ? "red"
                : "green",
          }}
        >
          {mensagem}
        </p>
      )}

      {/* ================= ETAPA 1 ================= */}
      {!mostrarAmbientes && (
        <form onSubmit={handleContinuar}>
          <h3>1. Dados Gerais e Financeiros</h3>

          <label>Nome do Cliente:</label>
          <input type="text" value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} required />

          <label>Descrição:</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required></textarea>

          <label>Valor Base (R$):</label>
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />

          <label>Data:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="Pendente">Pendente</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Recusado">Recusado</option>
          </select>

          <label>Telefone:</label>
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Endereço:</label>
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

          <label>Custos Extras (R$):</label>
          <input type="number" value={custosExtras} onChange={(e) => setCustosExtras(e.target.value)} />

          <label>Desconto Aplicado (R$):</label>
          <input type="number" value={descontoAplicado} onChange={(e) => setDescontoAplicado(e.target.value)} />

          <label>Valor Total (R$):</label>
          <input type="number" value={valorTotal} readOnly />

          <button type="submit">Continuar</button>
        </form>
      )}

      {/* ================= ETAPA 2 ================= */}
      {mostrarAmbientes && !mostrarResumo && (
        <div className="form-ambientes">
          <h3>2. 🏗️ Ambientes da Obra</h3>

          {ambientes.map((amb, indexAmb) => (
            <div key={indexAmb} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px", borderRadius: "10px" }}>
              <label>Ambiente:</label>
              <input type="text" name="nome" placeholder="Ex: Cozinha" value={amb.nome} onChange={(e) => handleAmbienteChange(indexAmb, e)} />

              <label>Metragem (m²):</label>
              <input type="number" name="metragem" value={amb.metragem} onChange={(e) => handleAmbienteChange(indexAmb, e)} />

              {/* Botão de excluir ambiente abaixo do campo metragem */}
              <button
                type="button"
                onClick={() => removerAmbiente(indexAmb)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  margin: "10px 0"
                }}
              >
                ❌ 
              </button>

              <h4>Itens do Ambiente:</h4>
              {amb.itens.map((item, indexItem) => (
                <div key={indexItem} style={{ marginLeft: "20px", borderLeft: "3px solid #007bff", paddingLeft: "10px", marginBottom: "10px", position: "relative" }}>
                  <select
                    value={item.tipo}
                    onChange={(e) => handleItemChange(indexAmb, indexItem, "tipo", e.target.value)}
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="material">Material</option>
                    <option value="servico">Serviço</option>
                  </select>

                  {/* CAMPOS PARA MATERIAL */}
                  {item.tipo === "material" && (
                    <>
                      <input
                        type="text"
                        placeholder="Nome do material"
                        value={item.nome}
                        onChange={(e) => handleItemChange(indexAmb, indexItem, "nome", e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Valor unitário sugerido"
                        value={item.valorUnitario}
                        onChange={(e) => handleItemChange(indexAmb, indexItem, "valorUnitario", e.target.value)}
                      />
                      
                    </>
                  )}

                  {/* CAMPOS PARA SERVIÇO */}
                  {item.tipo === "servico" && (
                    <>
                      <select
                        value={item.categoria}
                        onChange={(e) => {
                          handleItemChange(indexAmb, indexItem, "categoria", e.target.value);
                          if (e.target.value === "Drywall") {
                            handleItemChange(indexAmb, indexItem, "unidade", "m²");
                            handleItemChange(indexAmb, indexItem, "valorSugerido", 70);
                          } else if (e.target.value === "Steel Frame") {
                            handleItemChange(indexAmb, indexItem, "unidade", "m²");
                            handleItemChange(indexAmb, indexItem, "valorSugerido", 95);
                          }
                        }}
                      >
                        <option value="">Selecione o serviço</option>
                        <option value="Drywall">Drywall</option>
                        <option value="Steel Frame">Steel Frame</option>
                      </select>
                      <p>Unidade: {item.unidade || "-"}</p>
                      <p>Valor sugerido: R$ {item.valorSugerido || "0.00"}</p>
                    </>
                  )}

                  <input
                    type="number"
                    placeholder="Quantidade"
                    value={item.quantidade}
                    onChange={(e) => handleItemChange(indexAmb, indexItem, "quantidade", e.target.value)}
                  />

                  <p><strong>Valor Total:</strong> R$ {item.valorTotal || "0.00"}</p>

                  <button
                    type="button"
                    onClick={() => removerItem(indexAmb, indexItem)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "3px 8px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      position: "absolute",
                      right: "0",
                      top: "0"
                    }}
                  >
                    ❌
                  </button>
                </div>
              ))}

              <button type="button" onClick={() => adicionarItem(indexAmb)}>+ Adicionar Item</button>
            </div>
          ))}

          <button type="button" onClick={adicionarAmbiente}>+ Adicionar Ambiente</button>

          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={handleVoltarEtapa1}
              style={{
                backgroundColor: "#ccc",
                color: "#000",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
              }}
            >
              ⬅ Voltar
            </button>

            <button
              type="button"
              onClick={handleContinuarResumo}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Continuar para o Resumo ➡
            </button>
          </div>
        </div>
      )}

      {/* ================= ETAPA 3 ================= */}
      {mostrarResumo && (
        <div className="resumo-orcamento">
          <h3>3. 📋 Resumo e Confirmação</h3>

          <h4>Dados Gerais:</h4>
          <p><strong>Cliente:</strong> {clienteNome} ({email} | {telefone})</p>
          <p><strong>Endereço:</strong> {endereco}</p>
          <p><strong>Descrição:</strong> {descricao}</p>
          <p><strong>Data:</strong> {data} | <strong>Status:</strong> {status}</p>

          <h4>Valores:</h4>
          <ul>
            <li>Valor Base: R$ {parseFloat(valor).toFixed(2) || "0.00"}</li>
            <li>Custos Extras: R$ {parseFloat(custosExtras).toFixed(2) || "0.00"}</li>
            <li>Desconto Aplicado: R$ {parseFloat(descontoAplicado).toFixed(2) || "0.00"}</li>
            <li><strong>VALOR TOTAL: R$ {valorTotal}</strong></li>
          </ul>

          <h4>Ambientes:</h4>
          <ul>
            {ambientes.map((amb, i) => (
              <li key={i}>
                <strong>{amb.nome || "*Sem Nome*"}</strong> — {amb.metragem || "0"} m²
                <ul>
                  {amb.itens.map((item, j) => (
                    <li key={j}>
                      {item.tipo === "material"
                        ? `Material: ${item.nome} (${item.unidade}) - ${item.quantidade}x R$${item.valorUnitario}`
                        : `Serviço: ${item.categoria} - ${item.quantidade}x R$${item.valorSugerido}`} → Total: R$ {item.valorTotal}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            💾 Salvar Orçamento no Sistema
          </button>
        </div>
      )}
    </div>
  );
};

export default Cadastrar;
