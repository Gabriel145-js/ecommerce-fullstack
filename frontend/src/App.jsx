import { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import IndexPage from './pages/index/IndexPage'
import DashboardAdmin from './pages/Admin/DashboardAdmin'
import AddProduto from './components/Admin/AddProduto/AddProduto'
import Navigation from './components/Navigation/Navigation'
import GerenciarCategorias from './components/Admin/AddProduto/Categorias/GerenciarCategorias/GerenciarCategorias'
import Footer from './components/Footer/Footer'
import TodosProdutos from './components/Admin/AddProduto/TodosProdutos/TodosProdutos'

function AppRoutes() {
  const location = useLocation()

  // Verifica se a rota atual começa com "/DashboardAdmin"
  const isAdminRoute = location.pathname.startsWith('/DashboardAdmin')

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />}>
          <Route path="AddProduto" element={<AddProduto />} />
          <Route path="GerenciarCategorias" element={<GerenciarCategorias />} />
          <Route path="TodosProdutos" element={<TodosProdutos/>} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
