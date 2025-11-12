package orcamentos_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orcamento")
public class Orcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String clientenome;
    private String descricao;
    private long valor;

    private String data;               // Data do orçamento
    private String status;             // Ex: "Pendente", "Aprovado", "Recusado"
    private String telefone;           // Telefone do cliente
    private String email;              // E-mail do cliente
    private String endereco;           // Endereço da obra ou serviço
    private double valorTotal;         // Valor total final do orçamento
    private double custosExtras;       // Custos adicionais (transporte, taxas, etc.)
    private double descontoAplicado;   // Valor de desconto aplicado

    // 🔹 Novos campos adicionados
    private String nomeAmbiente;       // Nome do ambiente da obra
    private String nomeServico;        // Nome do serviço (ex: Drywall, Steel Frame, etc.)

    public Orcamento() {}

    public Orcamento(long id, String clientenome, String descricao, long valor, String data, String status,
                     String telefone, String email, String endereco, double valorTotal,
                     double custosExtras, double descontoAplicado, String nomeAmbiente, String nomeServico) {
        this.id = id;
        this.clientenome = clientenome;
        this.descricao = descricao;
        this.valor = valor;
        this.data = data;
        this.status = status;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
        this.valorTotal = valorTotal;
        this.custosExtras = custosExtras;
        this.descontoAplicado = descontoAplicado;
        this.nomeAmbiente = nomeAmbiente;
        this.nomeServico = nomeServico;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getClientenome() {
        return clientenome;
    }

    public void setClientenome(String clientenome) {
        this.clientenome = clientenome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public long getValor() {
        return valor;
    }

    public void setValor(long valor) {
        this.valor = valor;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public double getCustosExtras() {
        return custosExtras;
    }

    public void setCustosExtras(double custosExtras) {
        this.custosExtras = custosExtras;
    }

    public double getDescontoAplicado() {
        return descontoAplicado;
    }

    public void setDescontoAplicado(double descontoAplicado) {
        this.descontoAplicado = descontoAplicado;
    }

    public String getNomeAmbiente() {
        return nomeAmbiente;
    }

    public void setNomeAmbiente(String nomeAmbiente) {
        this.nomeAmbiente = nomeAmbiente;
    }

    public String getNomeServico() {
        return nomeServico;
    }

    public void setNomeServico(String nomeServico) {
        this.nomeServico = nomeServico;
    }
}
