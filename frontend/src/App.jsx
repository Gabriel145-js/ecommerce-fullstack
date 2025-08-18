import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import IndexPage from './pages/index/IndexPage'
import DashboardAdmin from './pages/Admin/DashboardAdmin'
import AddProduto from './components/Admin/AddProduto/AddProduto'
import Navigation from './components/Navigation/Navigation' 
import GerenciarCategorias from './components/Admin/AddProduto/Categorias/GerenciarCategorias/GerenciarCategorias'



function App() {

  return (
    <>
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path = "/" element={<IndexPage/>}/>

        <Route path='/DashboardAdmin' element={<DashboardAdmin/>}>
            <Route path='AddProduto' element={<AddProduto/>}/>
            <Route path='GerenciarCategorias' element={<GerenciarCategorias/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      
      
    </>
  )
}

export default App
