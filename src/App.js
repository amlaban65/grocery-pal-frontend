import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import Navbar from './components/navbar'
import useAuthContext from './hooks/useAuthContext'
function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to="/landing"/>}
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/"/>} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/"/>} 
            />
            <Route 
            path="/landing"
            element= {<Landing />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;