import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import IndexPage from './pages/index/IndexPage'
import DashboardAdmin from './pages/Admin/DashboardAdmin'
import AddProduto from './components/Admin/AddProduto/AddProduto'
import Navigation from './components/Navigation/Navigation' 



function App() {

  return (
    <>
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path = "/" element={<IndexPage/>}/>

        <Route path='/DashboardAdmin' element={<DashboardAdmin/>}>
            <Route path='AddProduto' element={<AddProduto/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      
      
    </>
  )
}

export default App
