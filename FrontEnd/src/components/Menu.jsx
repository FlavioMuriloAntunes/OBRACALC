import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/Menu.css";



const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-box">
      <h2 className="menu-title">Sistema de Orçamentos</h2>
      <p className="menu-subtitle">Escolha uma opção abaixo:</p>
      
      <div className="menu-buttons">
        <button onClick={() => navigate('/cadastrar')}>Cadastrar Orçamento</button>
        <button onClick={() => navigate('/Atualizar')}>Buscar</button>
        
        
      </div>
    </div>
  );
};

export default Menu;
