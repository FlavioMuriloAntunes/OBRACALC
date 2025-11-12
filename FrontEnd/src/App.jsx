import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Cadastrar from "./Pages/Cadastrar";
import Listar from "./Pages/Listar";
import Deletar from "./Pages/Deletar";
import Atualizar from "./Pages/Atualizar";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<Dashboard />} />

      {/* Páginas */}
      <Route path="/cadastrar" element={<Cadastrar />} />
      <Route path="/listar" element={<Listar />} />
      <Route path="/deletar" element={<Deletar />} />
      <Route path="/atualizar" element={<Atualizar />} />

      {/* Rota padrão (fallback) */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
