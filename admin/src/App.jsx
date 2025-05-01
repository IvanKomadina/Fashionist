import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin'
import Login from './Pages/Login'

const App = () => {
  const token = localStorage.getItem('auth-token')

  return (
    <div>
      <Navbar />
      {token ? <Admin /> : <Login />}
    </div>
  )
}

export default App