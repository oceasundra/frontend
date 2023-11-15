import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from '../views/auth/Login'
import Guest from '../middleware/Guest'
import Authenticated from '../middleware/Authenticated'
import Dashboard from '../views/Dashboard'
import Home from '../views/Home'
import Create from '../views/Create'
import Update from '../views/Update'

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Guest><Login /></Guest>} />
        <Route path='/admin' element={<Authenticated><Dashboard /></Authenticated>} />
        <Route path='/admin/home' element={<Authenticated><Dashboard /></Authenticated>} />
        <Route path='/admin/projects/create' element={<Authenticated><Create /></Authenticated>} />
        <Route path='/admin/projects/update/:slug' element={<Authenticated><Update /></Authenticated>} />
      </Routes>
    </Router>
  )
}

export default Index